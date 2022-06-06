import type { SbpmModelerOptions } from './core';
import { SbpmCanvas } from './core';
import { typeToClassMapping } from './sbpm';
import type { SbpmElementOptions } from './sbpm';

export default class SbpmModeler {
  #canvas: SbpmCanvas;
  #options: SbpmModelerOptions;

  constructor(options: SbpmModelerOptions) {
    if (!options?.container) {
      throw new Error('Container is not provided');
    }

    this.#canvas = new SbpmCanvas(options);
    this.#options = options;
  }

  public get canvas() {
    return this.#canvas;
  }

  public createElement(options: SbpmElementOptions) {
    const { type } = options;
    return new typeToClassMapping[type](options, this.#options);
  }

  public createLink() {
    // TODO
  }

  public updateElement() {
    // TODO
  }

  public updateLink() {
    // TODO
  }

  public addElement(options: SbpmElementOptions) {
    return this.createElement(options).addTo(this.#canvas.graph);
  }

  public addLink() {
    // TODO
  }
}
