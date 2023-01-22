import Canvas from '../canvas';
import LinkFactory from '../factories/link-factory';
import {
  MessageTransitionOptions,
  GenericOptions,
  SendStateTransitionOptions,
  ReceiveStateTransitionOptions,
  FunctionStateTransitionOptions
} from '../common/types';
import {
  createMessageTransitionOptions,
  createSendStateTransitionOptions,
  createReceiveStateTransitionOptions,
  createFunctionStateTransitionOptions
} from '../shapes/links';
import { updateOptionsMapping } from '../shapes/mappings';
import { ShapeType } from '../common/constants';

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
    const link = this.linkFactory.add(creationOptions);
    this.linkFactory.addSourceMarker(options?.isBidirectional, link);
    return link;
  }

  /**
   * Adds a new send state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addSendStateTransition(options: SendStateTransitionOptions) {
    const creationOptions = createSendStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Adds a new receive state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addReceiveStateTransition(options: ReceiveStateTransitionOptions) {
    const creationOptions = createReceiveStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Adds a new function state transition to the canvas.
   *
   * @param options [[LinkOptions]] object
   */
  public addFunctionStateTransition(options: FunctionStateTransitionOptions) {
    const creationOptions = createFunctionStateTransitionOptions(options);
    return this.linkFactory.add(creationOptions);
  }

  /**
   * Updates currently selected link on canvas.
   *
   * @param options Update options.
   */
  public updateCurrentlySelectedLink(options: GenericOptions) {
    const type = this.linkFactory.getSelectedLinkType();

    if (type === ShapeType.MESSAGE_TRANSITION) {
      this.linkFactory.addSourceMarker(options?.isBidirectional);
    }

    this.linkFactory.update(updateOptionsMapping[type](options));
  }
}
