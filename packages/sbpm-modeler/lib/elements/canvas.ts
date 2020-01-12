import * as joint from 'jointjs';
import { Events, Errors, ShapeTypes, CustomEvents } from '../variables';
import { combineStrings } from '../common/utils';
import { Coordinates } from '../types';

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
  },
  defaultRouter: {
    name: 'orthogonal'
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
   * @param container HTML element where the canvas will be rendered.
   * @returns New canvas instance.
   */
  public static initialize = (container: Element) => {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas(container);
      return Canvas._instance;
    }

    throw new Error(Errors.CANVAS_INITIALIZATION);
  };

  /**
   * Retrieved the canvas instance.
   *
   * @returns Canvas instance.
   * @throws Error when the modeler instance is not initialized.
   */
  public static getInstance() {
    if (!Canvas._instance) {
      throw new Error(Errors.CANVAS_INSTANCE_RETRIEVAL);
    }

    return Canvas._instance;
  }

  public unhighlight() {
    console.log(this);
    this.getElements().forEach((model: joint.dia.Element) => {
      this._paper.findViewByModel(model).unhighlight();
    });
  }

  public unhighlightElement(model: joint.dia.Element) {
    console.log(this);
    model.findView(this._paper).unhighlight();
  }

  constructor(container: Element) {
    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperDefaults,
      el: container,
      model: this._graph
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

  private addOrigin() {
    const Origin = joint.shapes.standard.Rectangle.define(
      ShapeTypes.ORIGIN,
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

  private getElements() {
    return this._graph.getElements();
  }
}
