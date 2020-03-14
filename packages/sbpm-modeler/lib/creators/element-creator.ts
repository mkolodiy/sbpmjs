import {
  SubjectOptions,
  StateOptions,
  MessageTransitionOptions
} from '../common/types';
import { createStandardSubjectOptions } from '../shapes/elements/standard-subject';
import ElementFactory from '../factories/element-factory';
import Canvas from '../canvas';
import { createSendStateOptions } from '../shapes/elements/send-state';
import { createReceiveStateOptions } from '../shapes/elements/receive-state';
import { createFunctionStateOptions } from '../shapes/elements/function-state';
import { createMessageTransitionOptions } from '../shapes/links/message-transition';
import LinkFactory from '../factories/link-factory';

export default class ElementCreator {
  private canvas: Canvas;
  private elementFactory: ElementFactory;
  private linkFactory: LinkFactory;

  /**
   * Constructor
   */
  public constructor(canvas: Canvas, container: Element) {
    this.canvas = canvas;
    this.elementFactory = new ElementFactory();
    this.linkFactory = new LinkFactory(container);
  }

  /**
   *
   */
  public addStandardSubject(options: SubjectOptions) {
    const creationOptions = createStandardSubjectOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addSendState(options: StateOptions) {
    const creationOptions = createSendStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addReceiveState(options: StateOptions) {
    const creationOptions = createReceiveStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addFunctionState(options: StateOptions) {
    const creationOptions = createFunctionStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addMessageTransition(options: MessageTransitionOptions) {
    const creationOptions = createMessageTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }
}
