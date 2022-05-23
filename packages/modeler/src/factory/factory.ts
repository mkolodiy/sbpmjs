import { SbpmElementType } from '../common';
import SbpmCanvas from '../canvas';
import SbpmElement from '../element';
import SbpmLink from '../link';
import SbpmProcessNetwork, { createProcessNetworkOptions } from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';
import SbpmProcessTransition, { createProcessTransitionOptions } from '../process-transition';
import type { SbpmProcessTransitionOptions } from '../process-transition';
import SbpmProcessModel, { createProcessModelOptions } from '../process-model';
import type { SbpmProcessModelOptions } from '../process-model';
import type { ElementOptionsType, LinkOptionsType } from './types';
import SbpmSubject, { createSubjectOptions } from '../subject';
import type { SbpmSubjectOptions } from '../subject';
import { validateLinkOptions } from './helper';
import type { SbpmModelerOptions } from '../modeler';
import SbpmMessageTransition, { createMessageTransitionOptions } from '../message-transition';
import type { SbpmMessageTransitionOptions } from '../message-transition';
import SbpmFunctionState, { createFunctionStateOptions } from '../function-state';
import type { SbpmFunctionStateOptions } from '../function-state';
import SbpmSendState, { createSendStateOptions } from '../send-state';
import type { SbpmSendStateOptions } from '../send-state';
import SbpmReceiveState, { createReceiveStateOptions } from '../receive-state';
import type { SbpReceiveStateOptions } from '../receive-state';

export default class SbpmFactory {
  #canvas: SbpmCanvas;
  #options: SbpmModelerOptions;

  constructor(canvas: SbpmCanvas, options: SbpmModelerOptions) {
    this.#canvas = canvas;
    this.#options = options;
  }

  public addSbpmProcessNetwork(options: SbpmProcessNetworkOptions) {
    return new SbpmProcessNetwork(createProcessNetworkOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessTransition(options: SbpmProcessTransitionOptions) {
    validateLinkOptions(SbpmElementType.PROCESS_TRANSITION, options);
    return new SbpmProcessTransition(createProcessTransitionOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessModel(options: SbpmProcessModelOptions) {
    return new SbpmProcessModel(createProcessModelOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSubject(options: SbpmSubjectOptions) {
    return new SbpmSubject(createSubjectOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSbpmMessageTransition(options: SbpmMessageTransitionOptions) {
    validateLinkOptions(SbpmElementType.MESSAGE_TRANSITION, options);
    return new SbpmMessageTransition(createMessageTransitionOptions(options)).addTo(this.#canvas.graph);
  }

  public addSbpmFunctionState(options: SbpmFunctionStateOptions) {
    return new SbpmFunctionState(createFunctionStateOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSbpmSendState(options: SbpmSendStateOptions) {
    return new SbpmSendState(createSendStateOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public addSbpmReceiveState(options: SbpmSendStateOptions) {
    return new SbpmReceiveState(createReceiveStateOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public updateElement<T extends SbpmElement>(element: T, options: ElementOptionsType<T>) {
    element.update(options);
  }

  public updateLink<T extends SbpmLink>(link: T, options: LinkOptionsType<T>) {
    link.update(options);
  }
}
