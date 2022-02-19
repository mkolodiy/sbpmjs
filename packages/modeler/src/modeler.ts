// import '../node_modules/jointjs/dist/joint.min.css';
import SbpmCanvas from './canvas';
import SbpmElement from './shapes/element/element';
import type { SbpmModelerOptions } from './common/types';

import { getProcessNetworkOptions } from './shapes-options/process-network/element';

export default class SbpmModeler {
  #canvas: SbpmCanvas;

  constructor(options: SbpmModelerOptions) {
    this.#canvas = new SbpmCanvas(options);
  }

  addSbpmProcessNetwork(options: any, representationalOptions?: any) {
    const sbpmProcessNetworkOptions = getProcessNetworkOptions(options, representationalOptions);
    // console.log(sbpmProcessNetworkOptions);

    //@ts-ignore
    const sbpmProcessNetwork = new SbpmElement(sbpmProcessNetworkOptions);
    // sbpmProcessNetwork.prop('test', 'test');
    // console.log(sbpmProcessNetwork);
    // console.log(sbpmProcessNetwork.attributes);
    sbpmProcessNetwork.addTo(this.#canvas.graph);

    return sbpmProcessNetwork;
  }

  updateElement(element: SbpmElement, options: any, representationalOptions?: any) {
    element.update(options, representationalOptions);
  }
}
