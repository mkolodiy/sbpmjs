import type { SbpmElement, SbpmLink } from './core';
import { SbpmCanvas } from './canvas';
import type { SbpmModelerOptions } from './canvas';
import { linkTypeToLinkClassMapping, elementTypeToElementClassMapping, validateLinkOptions } from './sbpm';
import type {
  GetSbpmElementOptions,
  GetSbpmElementUpdateOptions,
  GetSbpmLinkOptions,
  GetSbpmLinkUpdateOptions,
  ElementTypeToElementClassMapping,
  LinkTypeToLinkClassMapping,
} from './sbpm';
import type { SbpmElementType, SbpmLinkType } from './common';

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

  public createElement<Type extends SbpmElementType>(type: Type, options: GetSbpmElementOptions<Type>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new elementTypeToElementClassMapping[type](options, this.#options) as ElementTypeToElementClassMapping[Type];
  }

  public createLink<Type extends SbpmLinkType>(type: Type, options: GetSbpmLinkOptions<Type>) {
    validateLinkOptions(type, options);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new linkTypeToLinkClassMapping[type](options, this.#options) as LinkTypeToLinkClassMapping[Type];
  }

  public updateElement<T extends SbpmElement>(element: T, options: GetSbpmElementUpdateOptions<T>) {
    element.update(options);
  }

  public updateLink<T extends SbpmLink>(link: T, options: GetSbpmLinkUpdateOptions<T>) {
    link.update(options);
  }

  public addElement<Type extends SbpmElementType>(type: Type, options: GetSbpmElementOptions<Type>) {
    const element = this.createElement(type, options);
    element.addTo(this.#canvas.graph);
    return element;
  }

  public addLink<Type extends SbpmLinkType>(type: Type, options: GetSbpmLinkOptions<Type>) {
    const link = this.createLink(type, options);
    link.addTo(this.#canvas.graph);
    return link;
  }
}
