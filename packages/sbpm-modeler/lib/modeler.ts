import '../node_modules/jointjs/dist/joint.min.css';
import Canvas from './canvas';
import ElementCreator from './creators/element-creator';
import LinkCreator from './creators/link-creator';
import { ModelerOptions } from './common/types';

export default class Modeler {
  private static _instance: Modeler;
  private _canvas: Canvas;
  private _elementCreator: ElementCreator;
  private _linkCreator: LinkCreator;

  /**
   * Creates a new modeler instance.
   *
   * @param options [[ModelerOptions]] used to create a new modeler.
   */
  public static initialize(options: ModelerOptions) {
    if (!Modeler._instance) {
      Modeler._instance = new Modeler(options);
    }

    return Modeler._instance;
  }

  /**
   * Returns a modeler instance.
   *
   * @returns [[Modeler]] object.
   */
  public static getInstance() {
    return Modeler._instance;
  }

  /**
   * Constructor
   *
   * @param options [[ModelerOptions]] used to create a new modeler.
   */
  public constructor(options: ModelerOptions) {
    const { container } = options;
    this._canvas = new Canvas(options);
    this._elementCreator = new ElementCreator(this._canvas);
    this._linkCreator = new LinkCreator(this._canvas, container);
  }

  /**
   * Returns canvas instance.
   *
   * @returns [[Canvas]] instance.
   */
  public get canvas() {
    return this._canvas;
  }

  /**
   * Returns element creator instance.
   *
   * @returns [[ElementCreator]] instance.
   */
  public get elementCreator() {
    return this._elementCreator;
  }

  /**
   * Returns link creator instance.
   *
   * @returns [[LinkCreator]] instance.
   */
  public get linkCreator() {
    return this._linkCreator;
  }
}
