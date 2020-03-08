import * as joint from 'jointjs';
import {
  Events,
  Errors,
  Shapes,
  CustomEvents,
  ShapeNamespaces
} from '../constants';
import { combineStrings } from '../common/utils';
import { Coordinates, ModelerOptions } from '../types';

/**
 * Default options used to create a new paper instance.
 */
const paperDefaults = {
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
  private static _instance: Canvas = null;
  private _graph: joint.dia.Graph = null;
  private _paper: joint.dia.Paper = null;
  private _dragStartPosition: Coordinates = null;

  public get graph() {
    return this._graph;
  }

  public get paper() {
    return this._paper;
  }

  /**
   * Create a new canvas.
   *
   * @param options [[ModelerOptions]] object.
   * @returns [[Canvas]] instance.
   */
  public static initialize = (options: ModelerOptions) => {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas(options);
      return Canvas._instance;
    }

    throw new Error(Errors.CANVAS_INITIALIZATION);
  };

  /**
   * Retrieves the canvas instance.
   *
   * @returns [[Canvas]] instance.
   * @throws Error when the modeler instance is not initialized.
   */
  public static getInstance() {
    if (!Canvas._instance) {
      throw new Error(Errors.CANVAS_INSTANCE_RETRIEVAL);
    }

    return Canvas._instance;
  }

  /**
   * Unhighlights all the elements on the canvas.
   */
  public unhighlight() {
    this.getElements().forEach((model: joint.dia.Element) => {
      this._paper.findViewByModel(model).unhighlight();
    });
  }

  /**
   * Unhighlights one specific element on the canvas.
   *
   * @param model Jointjs element.
   */
  public unhighlightElement(model: joint.dia.Element) {
    model.findView(this._paper).unhighlight();
  }

  constructor(options: ModelerOptions) {
    const { el: container, routerName } = options;

    const defaultRouter = routerName
      ? { name: routerName }
      : { name: 'normal' };

    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperDefaults,
      el: container,
      model: this._graph,
      defaultRouter
    });

    this.addDragging(container);
    this.addOrigin();
    this.registerPaperEvents();
  }

  /**
   * Add dragging to the canvas.
   *
   * @param container HTML element where the canvas will be rendered.
   */
  private addDragging(container: Element) {
    this._paper.on(
      Events.BLANK_POINTERDOWN,
      (event: MouseEvent, x: number, y: number) => {
        this._dragStartPosition = { x: x, y: y };
      }
    );

    const pointerupEvents = combineStrings([
      Events.CELL_POINTERUP,
      Events.BLANK_POINTERUP
    ]);
    this._paper.on(pointerupEvents, () => {
      this._dragStartPosition = null;
    });

    container.addEventListener(
      Events.MOUSEMOVE,
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
      Shapes.ORIGIN,
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
    this._paper.on(Events.BLANK_POINTERDOWN, () => {
      this._paper.hideTools();
    });

    this._paper.on(
      combineStrings([Events.ELEMENT_POINTERDOWN, Events.LINK_POINTERDOWN]),
      (cellView: joint.dia.CellView) => {
        this._paper.hideTools();
        cellView.model.toFront();
      }
    );

    this._paper.on(
      CustomEvents.LINK_REMOVE_VERTICES,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.vertices([]);
      }
    );

    this._paper.on(
      CustomEvents.LINK_REMOVE,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.remove();
      }
    );
  }

  /**
   * Get all elements on the canvas.
   */
  private getElements() {
    const allElements = this._graph.getElements();
    return allElements.filter(
      (el: joint.dia.Element) => el.attributes.type !== ShapeNamespaces.COMMON
    );
  }
}
