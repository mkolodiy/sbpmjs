import * as joint from 'jointjs';
import { EventTypes, Errors } from '../variables';
import { combineStrings } from '../utils';
import { paperDefaults } from '../options';
import { Coordinates } from '../types';
import { createOrigin } from '../shapes';

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
    this._graph.addCell(createOrigin());
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
}
