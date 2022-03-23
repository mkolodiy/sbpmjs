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
import type { OptionsType } from './types';
import { validateLinkOptions } from './helper';

export default class SbpmFactory {
  #canvas: SbpmCanvas;

  constructor(canvas: SbpmCanvas) {
    this.#canvas = canvas;
  }

  public addSbpmProcessNetwork(options: SbpmProcessNetworkOptions) {
    return new SbpmProcessNetwork(createProcessNetworkOptions(options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessNetworkTransition(options: SbpmProcessModelTransitionOptions) {
    validateLinkOptions(SbpmElementType.PROCESS_NETWORK_TRANSITION, options);
    return new SbpmProcessNetworkTransition(createProcessNetworkTransitionOptions(options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessModel(options: SbpmProcessModelOptions) {
    return new SbpmProcessModel(createProcessModelOptions(options)).addTo(this.#canvas.graph);
  }

  public updateElement<T extends SbpmElement>(element: T, options: OptionsType<T>) {
    element.update(options);
  }
}
