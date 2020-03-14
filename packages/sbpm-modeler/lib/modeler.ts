import '../node_modules/jointjs/dist/joint.min.css';
import {
  ModelerOptions,
  SubjectOptions,
  StateOptions,
  MessageTransitionOptions
} from './common/types';
import ElementCreator from './creators/element-creator';
import Canvas from './canvas';

export default class Modeler {
  private static instance: Modeler;
  public canvas: Canvas;
  private elementCreator: ElementCreator;

  public static create(options: ModelerOptions) {
    if (!Modeler.instance) {
      Modeler.instance = new Modeler(options);
    }

    return Modeler.instance;
  }

  public static getInstance() {
    return Modeler.instance;
  }

  public constructor(options: ModelerOptions) {
    const { el } = options;
    this.canvas = Canvas.initialize(options);
    this.elementCreator = new ElementCreator(this.canvas, el);
  }

  public addStandardSubject(options: SubjectOptions) {
    return this.elementCreator.addStandardSubject(options);
  }

  public addSendState(options: StateOptions) {
    return this.elementCreator.addSendState(options);
  }

  public addReceiveState(options: StateOptions) {
    return this.elementCreator.addReceiveState(options);
  }

  public addFunctionState(options: StateOptions) {
    return this.elementCreator.addFunctionState(options);
  }

  public addMessageTransition(options: MessageTransitionOptions) {
    return this.elementCreator.addMessageTransition(options);
  }
}
