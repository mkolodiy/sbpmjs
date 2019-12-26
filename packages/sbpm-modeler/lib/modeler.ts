import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions } from './types';
import { paperDefaults } from './options';
import { Errors } from './variables';
import { isValidObject } from './utils';
import { createOrigin } from './shapes';

export default class Modeler {
  private static _instance: Modeler;
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
  }
}
