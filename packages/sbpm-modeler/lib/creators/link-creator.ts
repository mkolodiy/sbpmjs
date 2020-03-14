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
   */
  public constructor(canvas: Canvas, container: Element) {
    this.linkFactory = new LinkFactory(canvas, container);
  }

  public addMessageTransition(options: MessageTransitionOptions) {
    const creationOptions = createMessageTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  public addSendStateTransition(options: LinkOptions) {
    const creationOptions = createSendStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  public addReceiveStateTransition(options: LinkOptions) {
    const creationOptions = createReceiveStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  public addFunctionStateTransition(options: LinkOptions) {
    const creationOptions = createFunctionStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }
}
