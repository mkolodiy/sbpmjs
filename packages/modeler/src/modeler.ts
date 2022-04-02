import type { SbpmModelerOptions } from './canvas';
import SbpmCanvas from './canvas';
import SbpmFactory from './factory';

export default class SbpmModeler {
  #canvas: SbpmCanvas;
  #factory: SbpmFactory;

  constructor(options: SbpmModelerOptions) {
    if (!options?.container) {
      throw new Error('SbpmModeler: container is not provided');
    }

    this.#canvas = new SbpmCanvas(options);
    this.#factory = new SbpmFactory(this.#canvas);
  }

  public get canvas() {
    return this.#canvas;
  }

  public get factory() {
    return this.#factory;
  }
}
