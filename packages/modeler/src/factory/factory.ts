import { SbpmElementType } from '../common';
import SbpmCanvas from '../canvas';
import SbpmElement from '../element';
import SbpmLink from '../link';
import SbpmProcessNetwork, { createProcessNetworkOptions } from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';
import SbpmProcessNetworkTransition, { createProcessNetworkTransitionOptions } from '../process-network-transition';
import type { SbpmProcessModelTransitionOptions } from '../process-network-transition';
import SbpmProcessModel, { createProcessModelOptions } from '../process-model';
import type { SbpmProcessModelOptions } from '../process-model';
import type { ElementOptionsType, LinkOptionsType } from './types';
import { validateLinkOptions } from './helper';
import type { SbpmModelerOptions } from '../modeler';

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

  public addSbpmProcessNetworkTransition(options: SbpmProcessModelTransitionOptions) {
    validateLinkOptions(SbpmElementType.PROCESS_NETWORK_TRANSITION, options);
    return new SbpmProcessNetworkTransition(createProcessNetworkTransitionOptions(options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessModel(options: SbpmProcessModelOptions) {
    return new SbpmProcessModel(createProcessModelOptions(options, this.#options)).addTo(this.#canvas.graph);
  }

  public updateElement<T extends SbpmElement>(element: T, options: ElementOptionsType<T>) {
    element.update(options);
  }

  public updateLink<T extends SbpmLink>(link: T, options: LinkOptionsType<T>) {
    link.update(options);
  }
}
