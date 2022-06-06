import type { SbpmElement, SbpmLink, SbpmModelerOptions } from './core';
import { SbpmCanvas } from './canvas';
import { ElementOptionsType, elementTypeToElementClassMapping, LinkOptionsType, linkTypeToLinkClassMapping } from './sbpm';
import type { SbpmElementOptions, SbpmLinkOptions } from './sbpm';

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
    return new elementTypeToElementClassMapping[type](options, this.#options);
  }

  public createLink(options: SbpmLinkOptions) {
    const { type } = options;
    return new linkTypeToLinkClassMapping[type](options, this.#options);
  }

  public updateElement<T extends SbpmElement>(element: T, options: ElementOptionsType<T>) {
    element.update(options);
  }

  public updateLink<T extends SbpmLink>(link: T, options: LinkOptionsType<T>) {
    link.update(options);
  }

  public addElement(options: SbpmElementOptions) {
    return this.createElement(options).addTo(this.#canvas.graph);
  }

  public addLink(options: SbpmLinkOptions) {
    return this.createLink(options).addTo(this.#canvas.graph);
  }
}
