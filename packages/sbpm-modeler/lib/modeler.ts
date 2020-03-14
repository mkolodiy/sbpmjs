import '../node_modules/jointjs/dist/joint.min.css';
import {
  ModelerOptions,
  SubjectOptions,
  StateOptions,
  MessageTransitionOptions,
  LinkOptions
} from './common/types';
import ElementCreator from './creators/element-creator';
import Canvas from './canvas';
import LinkCreator from './creators/link-creator';

export default class Modeler {
  private static _instance: Modeler;
  private _canvas: Canvas;
  private _elementCreator: ElementCreator;
  private _linkCreator: LinkCreator;

  public get canvas() {
    return this._canvas;
  }

  public static create(options: ModelerOptions) {
    if (!Modeler._instance) {
      Modeler._instance = new Modeler(options);
    }

    return Modeler._instance;
  }

  public static getInstance() {
    return Modeler._instance;
  }

  public constructor(options: ModelerOptions) {
    const { container } = options;
    this._canvas = new Canvas(options);
    this._elementCreator = new ElementCreator(this._canvas);
    this._linkCreator = new LinkCreator(this._canvas, container);
  }

  public addStandardSubject(options: SubjectOptions) {
    return this._elementCreator.addStandardSubject(options);
  }

  public addSendState(options: StateOptions) {
    return this._elementCreator.addSendState(options);
  }

  public addReceiveState(options: StateOptions) {
    return this._elementCreator.addReceiveState(options);
  }

  public addFunctionState(options: StateOptions) {
    return this._elementCreator.addFunctionState(options);
  }

  public addMessageTransition(options: MessageTransitionOptions) {
    return this._linkCreator.addMessageTransition(options);
  }

  public addSendStateTransition(options: LinkOptions) {
    return this._linkCreator.addSendStateTransition(options);
  }

  public addReceiveStateTransition(options: LinkOptions) {
    return this._linkCreator.addReceiveStateTransition(options);
  }

  public addFunctionStateTransition(options: LinkOptions) {
    return this._linkCreator.addFunctionStateTransition(options);
  }
}
