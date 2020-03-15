import Canvas from '../canvas';
import LinkFactory from '../factories/link-factory';
import { LinkOptions, MessageTransitionOptions } from '../common/types';
import { createMessageTransitionOptions } from '../shapes/links/message-transition';
import { createSendStateTransitionOptions } from '../shapes/links/send-state-transition';
import { createReceiveStateTransitionOptions } from '../shapes/links/receive-state-transition';
import { createFunctionStateTransitionOptions } from '../shapes/links/function-state-transition';

export default class LinkCreator {
  private linkFactory: LinkFactory;

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object
   * @param container [[Element]] object
   */
  public constructor(canvas: Canvas, container: Element) {
    this.linkFactory = new LinkFactory(canvas, container);
  }

  /**
   * Adds a new message transition to the canvas.
   *
   * @param options [[MessageTransitionOptions]] object
   */
  public addMessageTransition(options: MessageTransitionOptions) {
    const creationOptions = createMessageTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Adds a new send state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addSendStateTransition(options: LinkOptions) {
    const creationOptions = createSendStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Adds a new receive state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addReceiveStateTransition(options: LinkOptions) {
    const creationOptions = createReceiveStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Adds a new function state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addFunctionStateTransition(options: LinkOptions) {
    const creationOptions = createFunctionStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }
}
