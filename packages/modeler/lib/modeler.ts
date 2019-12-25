import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions } from './types';
import { paperDefaults } from './options';
import { Errors } from './variables';

export default class Modeler {
  private static instance: Modeler;
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;

  public static initialize(options: ModelerOptions): Modeler {
    if (!Modeler.instance) {
      Modeler.instance = new Modeler(options);
      return Modeler.instance;
    }

    throw new Error(Errors.INITIALIZATION);
  }

  public static getInstance(): Modeler {
    if (!Modeler.instance) {
      throw new Error(Errors.INSTANCE_RETRIEVAL);
    }

    return Modeler.instance;
  }

  constructor(options: ModelerOptions) {
    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperDefaults,
      ...options,
      model: this._graph
    });
  }
}
