import SbpmCanvas from '../canvas';
import SbpmElement from '../element';
import SbpmProcessNetwork, { createProcessNetworkOptions } from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';
import SbpmProcessNetworkTransition, { createProcessNetworkTransitionOptions } from '../process-network-transition';
import type { SbpmProcessModelTransitionOptions } from '../process-network-transition';
import type { OptionsType } from './types';

export default class SbpmFactory {
  #canvas: SbpmCanvas;

  constructor(canvas: SbpmCanvas) {
    this.#canvas = canvas;
  }

  public addSbpmProcessNetwork(options: SbpmProcessNetworkOptions) {
    return new SbpmProcessNetwork(createProcessNetworkOptions(options)).addTo(this.#canvas.graph);
  }

  public addSbpmProcessNetworkTransition(options: SbpmProcessModelTransitionOptions) {
    return new SbpmProcessNetworkTransition(createProcessNetworkTransitionOptions(options)).addTo(this.#canvas.graph);
  }

  public updateElement<T extends SbpmElement>(element: T, options: OptionsType<T>) {
    element.update(options);
  }
}
