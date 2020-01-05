import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions, SubjectOptions } from './types';
import { Errors, EventTypes } from './variables';
import { isValidObject } from './common/utils';
import { createElementTools } from './common/element-tools';
import Canvas from './elements/canvas';
import StandardSubject from './elements/standard-subject';

export default class Modeler {
  private static _instance: Modeler;
  private _canvas: Canvas;
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;

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
   * Create and configures jointjs paper and graph.
   *
   * @param options [[ModelerOptions]] object containing values needed for creating new modeler instance.
   */
  constructor(options: ModelerOptions) {
    this._canvas = Canvas.create(options.el);
    this._graph = this._canvas.graph;
    this._paper = this._canvas.paper;

    this.registerPaperEvents();
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
  };

  /** PUBLIC METHODS */

  public addStandardSubject(options: SubjectOptions) {
    StandardSubject.add(this._canvas, options);
  }
}
