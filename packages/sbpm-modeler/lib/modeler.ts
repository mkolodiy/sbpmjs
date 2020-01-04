import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions, Coordinates, SubjectOptions } from './types';
import { paperDefaults } from './options';
import { Errors, EventTypes } from './variables';
import { isValidObject, combineStrings } from './utils';
import {
  createOrigin,
  createStandardSubject,
  createElementTools
} from './shapes';

export default class Modeler {
  private static _instance: Modeler;
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;
  private _dragStartPosition: Coordinates = null;

  /**
   * Creates a new modeler instance.
   *
   * @param options [[ModelerOptions]] object containing values needed for creating new modeler instance.
   * @returns A new instance of the modeler.
   * @throws Error when the modeler instance is already initialized.
   * @throws Error when the modeler options are not valid.
   */
  public static initialize(options: ModelerOptions): Modeler {
    if (!isValidObject(options)) {
      throw new Error(Errors.INVALID_MODELER_OPTIONS);
    }

    if (!Modeler._instance) {
      Modeler._instance = new Modeler(options);
      return Modeler._instance;
    }

    throw new Error(Errors.INITIALIZATION);
  }

  /**
   * Retrieved the modeler instance.
   *
   * @returns Modeler instance.
   * @throws Error when the modeler instance is not initialized.
   */
  public static getInstance(): Modeler {
    if (!Modeler._instance) {
      throw new Error(Errors.INSTANCE_RETRIEVAL);
    }

    return Modeler._instance;
  }

  /**
   * Creates and configures jointjs paper and graph.
   *
   * @param options [[ModelerOptions]] object containing values needed for creating new modeler instance.
   */
  constructor(options: ModelerOptions) {
    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperDefaults,
      ...options,
      model: this._graph
    });

    this._graph.addCell(createOrigin());
    this.addDragging(options.el);

    this.registerPaperEvents();
  }

  /** GENERAL FUNCTIONALITY */

  /**
   * Add dragging to the canvas.
   *
   * @param container - HTML element where the modeler is rendered.
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

  /** PRIVATE METHODS */

  private addObject(object: joint.dia.Element) {
    this._graph.addCell(object);
    object.toFront();
  }

  private registerPaperEvents() {
    this._paper.on(EventTypes.BLANK_POINTERDOWN, () => {
      this._paper.hideTools();
    });

    this._paper.on(
      EventTypes.ELEMENT_POINTERDOWN,
      this.paperOnElementPointerdown
    );
  }

  private paperOnElementPointerdown = (cellView: joint.dia.CellView) => {
    this._paper.hideTools();
    cellView.model.toFront();
    const type = cellView.model.attributes.type;
    cellView.addTools(createElementTools());
  };

  /** PUBLIC METHODS */

  public addStandardSubject(options: SubjectOptions) {
    this.addObject(createStandardSubject(options));
  }
}
