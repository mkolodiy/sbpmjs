import SbpmCanvas from './canvas';
import SbpmElement from './element';
import type { SbpmElementOptions, SbpmModelerOptions, SbpmProcessModelTransitionOptions, SbpmProcessNetworkOptions } from './common';
import SbpmProcessNetwork, { createProcessNetworkOptions } from './process-network';
import SbpmProcessNetworkTransition, { createProcessNetworkTransitionOptions } from './process-network-transition';

type OptionsType<T> = T extends SbpmProcessNetwork ? SbpmProcessNetworkOptions : SbpmElementOptions;

export default class SbpmModeler {
  #canvas: SbpmCanvas;

  constructor(options: SbpmModelerOptions) {
    this.#canvas = new SbpmCanvas(options);
  }

  public get canvas() {
    return this.#canvas;
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
