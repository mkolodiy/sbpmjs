import SbpmCanvas from './canvas';
import SbpmElement from './element';
import type { SbpmModelerOptions, SbpmProcessNetworkOptions } from './common';
import SbpmProcessNetwork, { createProcessNetworkOptions } from './process-network';

type OptionsType<T> = T extends SbpmProcessNetwork ? SbpmProcessNetworkOptions : unknown;

export default class SbpmModeler {
  #canvas: SbpmCanvas;

  constructor(options: SbpmModelerOptions) {
    this.#canvas = new SbpmCanvas(options);
  }

  addSbpmProcessNetwork(options: SbpmProcessNetworkOptions) {
    return new SbpmProcessNetwork(createProcessNetworkOptions(options)).addTo(this.#canvas.graph);
  }

  updateElement<T extends SbpmElement>(element: T, options: OptionsType<T>) {
    element.update(options);
  }
}
