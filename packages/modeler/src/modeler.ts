// import '../node_modules/jointjs/dist/joint.min.css';
import SbpmCanvas from './canvas';
import SbpmElement from './element';
import type { SbpmModelerOptions, SbpmProcessNetworkOptions } from './common';
import SbpmProcessNetwork, { createProcessNetworkOptions } from './process-network';

export default class SbpmModeler {
  #canvas: SbpmCanvas;

  constructor(options: SbpmModelerOptions) {
    this.#canvas = new SbpmCanvas(options);
  }

  addSbpmProcessNetwork(options: SbpmProcessNetworkOptions) {
    return new SbpmProcessNetwork(createProcessNetworkOptions(options)).addTo(this.#canvas.graph);
  }

  updateElement(element: SbpmElement, options: any, representationalOptions?: any) {
    element.update(options, representationalOptions);
  }
}
