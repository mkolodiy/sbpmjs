import * as joint from 'jointjs';
import { EventTypes, Errors, ShapeTypes } from '../variables';
import { combineStrings } from '../common/utils';
import { paperDefaults } from '../options';
import { Coordinates } from '../types';

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
  public static create = (container: Element) => {
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

  /**
   * Create and configures a new canvas.
   *
   * @param container HTML element where the canvas will be rendered.
   */
  constructor(container: Element) {
    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperDefaults,
      el: container,
      model: this._graph
    });

    this.addDragging(container);
    this.addOrigin();
  }

  /**
   * Add dragging to the canvas.
   *
   * @param container HTML element where the canvas will be rendered.
   */
  private addDragging(container: Element) {
    this._paper.on(
      EventTypes.BLANK_POINTERDOWN,
      (event: MouseEvent, x: number, y: number) => {
        this._dragStartPosition = { x: x, y: y };
      }
    );

    const pointerupEvents = combineStrings([
      EventTypes.CELL_POINTERUP,
      EventTypes.BLANK_POINTERUP
    ]);
    this._paper.on(pointerupEvents, () => {
      this._dragStartPosition = null;
    });

    container.addEventListener(
      EventTypes.MOUSEMOVE,
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
}
