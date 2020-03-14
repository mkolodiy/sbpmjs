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
  private static instance: Modeler;
  public canvas: Canvas;
  private elementCreator: ElementCreator;
  private linkCreator: LinkCreator;

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
    const { container } = options;
    this.canvas = Canvas.initialize(options);
    this.elementCreator = new ElementCreator();
    this.linkCreator = new LinkCreator(container);
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
    return this.linkCreator.addMessageTransition(options);
  }

  public addSendStateTransition(options: LinkOptions) {
    return this.linkCreator.addSendStateTransition(options);
  }

  public addReceiveStateTransition(options: LinkOptions) {
    return this.linkCreator.addReceiveStateTransition(options);
  }

  public addFunctionStateTransition(options: LinkOptions) {
    return this.linkCreator.addFunctionStateTransition(options);
  }
}
