import * as joint from 'jointjs';
import {
  Event,
  ShapeType,
  CustomEvent,
  ShapeNamespace
} from './common/constants';
import { combineStrings } from './common/utils';
import { Coordinates, ModelerOptions } from './common/types';

/**
 * Default options used to create a new paper.
 */
const paperOptions = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0
  }
};

export default class Canvas {
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;
  private _dragStartPosition: Coordinates;

  /**
   * Constructor
   *
   * @param options [[ModelerOptions]] object containing all options for creating a new canvas.
   */
  public constructor(options: ModelerOptions) {
    const { container, routerName } = options;

    const defaultRouter = routerName
      ? { name: routerName }
      : { name: 'normal' };

    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperOptions,
      el: container,
      model: this._graph,
      defaultRouter
    });
    this._dragStartPosition = null;

    this.addDragging(container);
    this.addOrigin();
    this.registerPaperEvents();
  }

  /**
   * Returns graph instance.
   *
   * @returns Joint graph.
   */
  public get graph() {
    return this._graph;
  }

  /**
   * Returns paper instance.
   *
   * @returns Joint paper.
   */
  public get paper() {
    return this._paper;
  }

  /**
   * Unhighlights all the elements on the canvas.
   */
  public unhighlightAllElements() {
    this.getElements().forEach((model: joint.dia.Element) => {
      this._paper.findViewByModel(model).unhighlight();
    });
  }

  /**
   * Unhighlights one specific element on the canvas.
   *
   * @param model Joint element.
   */
  public unhighlightElement(model: joint.dia.Element) {
    model.findView(this._paper).unhighlight();
  }

  /**
   * Get all elements on the canvas.
   */
  public getElements() {
    const allElements = this._graph.getElements();
    return allElements.filter(
      (el: joint.dia.Element) => el.attributes.type !== ShapeNamespace.COMMON
    );
  }

  /**
   * Get all links on the canvas.
   */
  public getLinks() {
    const allElements = this._graph.getLinks();
    return allElements.filter(
      (el: joint.dia.Link) => el.attributes.type !== ShapeNamespace.COMMON
    );
  }

  /**
   * Removes all shapes from the graph.
   */
  public clear() {
    this._graph.clear();
    this.addOrigin();
  }

  /**
   * Sets canvas to origin.
   */
  public setToOrigin() {
    this._paper.translate(0, 0);
  }

  /**
   * Add dragging to the canvas.
   *
   * @param container HTML element where the canvas will be rendered.
   */
  private addDragging(container: Element) {
    this._paper.on(
      Event.BLANK_POINTERDOWN,
      (event: MouseEvent, x: number, y: number) => {
        this._dragStartPosition = { x: x, y: y };
      }
    );

    const pointerupEvents = combineStrings([
      Event.CELL_POINTERUP,
      Event.BLANK_POINTERUP
    ]);
    this._paper.on(pointerupEvents, () => {
      this._dragStartPosition = null;
    });

    container.addEventListener(
      Event.MOUSEMOVE,
      (event: MouseEvent) => {
        if (this._dragStartPosition !== null) {
          const scale = this._paper.scale();

          const x = event.offsetX - this._dragStartPosition.x * scale.sx;
          const y = event.offsetY - this._dragStartPosition.y * scale.sy;

          this._paper.translate(x, y);
        }
      },
      true
    );
  }

  /**
   * Adds origin point to the canvas.
   */
  private addOrigin() {
    const Origin = joint.shapes.standard.Rectangle.define(
      ShapeType.ORIGIN,
      {
        attrs: {
          x: -20,
          y: -20,
          width: 40,
          height: 40,
          verticalLine: {
            xAlignment: 'middle',
            yAlignment: 'middle',
            width: 3,
            height: 40,
            fill: '#000',
            opacity: 0.25,
            pointerEvents: 'none'
          },
          horizontalLine: {
            xAlignment: 'middle',
            yAlignment: 'middle',
            width: 40,
            height: 3,
            fill: '#000',
            opacity: 0.25,
            pointerEvents: 'none'
          },
          text: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '50%',
            refY: '50%',
            fill: '#000',
            opacity: 0.25,
            text: '(0,0)',
            pointerEvents: 'none'
          }
        }
      },
      {
        markup: [
          {
            tagName: 'rect',
            selector: 'verticalLine'
          },
          {
            tagName: 'rect',
            selector: 'horizontalLine'
          },
          {
            tagName: 'text',
            selector: 'text'
          }
        ]
      }
    );

    const origin = new Origin();
    origin.resize(40, 40);
    origin.addTo(this._graph);
  }

  /**
   * Registers all necessary events needed for the interaction with the canvas and elements on the canvas.
   */
  private registerPaperEvents() {
    this._paper.on(Event.BLANK_POINTERDOWN, () => {
      this._paper.hideTools();
    });

    this._paper.on(
      combineStrings([Event.ELEMENT_POINTERDOWN, Event.LINK_POINTERDOWN]),
      (cellView: joint.dia.CellView) => {
        this._paper.hideTools();
        cellView.model.toFront();
      }
    );

    this._paper.on(
      CustomEvent.LINK_REMOVE_VERTICES,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.vertices([]);
      }
    );

    this._paper.on(
      CustomEvent.LINK_REMOVE,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.remove();
      }
    );
  }
}
