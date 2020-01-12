import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions, SubjectOptions, Coordinates } from './types';
import { Errors } from './variables';
import { isValidObject } from './common/utils';
import Canvas from './elements/canvas';
import StandardSubjectFactory from './elements/standard-subject-factory';
import MessageFactory from './elements/message-factory';

export default class Modeler {
  private static _instance: Modeler;
  private _canvas: Canvas;
  private _ssf: StandardSubjectFactory;
  private _mf: MessageFactory;

  /**
   * Creates a new [[Modeler]] instance.
   *
   * @param options [[ModelerOptions]] object containing values needed to create a new [[Modeler]] instance.
   * @returns A new [[Modeler]] instance.
   * @throws Error when the [[Modeler]] instance is already initialized.
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
   * Retrieves the [[Modeler]] instance.
   *
   * @returns [[Modeler]] instance.
   * @throws Error when the modeler instance is not initialized.
   */
  public static getInstance(): Modeler {
    if (!Modeler._instance) {
      throw new Error(Errors.INSTANCE_RETRIEVAL);
    }

    return Modeler._instance;
  }

  constructor(options: ModelerOptions) {
    const { el } = options;

    this._canvas = Canvas.initialize(el);
    this._ssf = StandardSubjectFactory.initialize();
    this._mf = MessageFactory.initialize(el);
  }

  public get canvas() {
    return this._canvas;
  }

  public get ssf() {
    return this._ssf;
  }

  public get mf() {
    return this._mf;
  }

  public addStandardSubject(options: SubjectOptions) {
    this._ssf.add(options);
  }
}
