import { SbpmElement, SbpmLink } from './core';
import { SbpmCanvas } from './canvas';
import type { SbpmModelerOptions } from './canvas';
import { linkTypeToLinkClassMapping, elementTypeToElementClassMapping } from './sbpm';
import type {
  GetSbpmElementOptions,
  GetSbpmElementUpdateOptions,
  GetSbpmLinkOptions,
  GetSbpmLinkUpdateOptions,
  ElementTypeToElementClassMapping,
  LinkTypeToLinkClassMapping,
  SbpmView,
} from './sbpm';
import { isSbpmLinkType, SbpmElementType, SbpmLinkType } from './common';

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

  /**
   * Get the canvas instance.
   *
   * @returns The canvas instance.
   */
  public get canvas() {
    return this.#canvas;
  }

  /**
   * Create a new element.
   *
   * @remark
   * The options will be automatically inferred based on the passed type.
   *
   * @param type The element type.
   * @param options The options for the element.
   * @returns The element instance.
   *
   * @example
   * Here is an example for a ProcessNetwork element:
   * ```
   * const element = modeler.createElement('ProcessNetwork', {
   *  label: 'Test',
   *  position: {
   *    x: 100,
   *    y: 80,
   *  },
   * });
   * ```
   */
  public createElement<Type extends SbpmElementType>(type: Type, options: GetSbpmElementOptions<Type>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new elementTypeToElementClassMapping[type](options, this.#options) as ElementTypeToElementClassMapping[Type];
  }

  /**
   * Create a new link.
   *
   * @remark
   * The options will be automatically inferred based on the passed type.
   *
   * @param type The link type.
   * @param options The options for the link.
   * @returns The link instance.
   *
   * @example
   * Here is an example for a ProcessTransition link:
   * ```
   * const link = modeler.createLink('ProcessTransition', {
   *  source: processNetwork,
   *  target: processModel,
   * });
   * ```
   */
  public createLink<Type extends SbpmLinkType>(type: Type, options: GetSbpmLinkOptions<Type>) {
    // validateLinkOptions(type, options);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new linkTypeToLinkClassMapping[type](options, this.#options) as LinkTypeToLinkClassMapping[Type];
  }

  /**
   * Update an element.
   *
   * @remark
   * The options will be automatically inferred based on the passed element.
   *
   * @param element The element to update.
   * @param options The options for the element.
   *
   * @example
   * Here is an example for a ProcessNetwork element:
   * ```
   * const element = modeler.createElement('ProcessNetwork', {
   *  label: 'Test',
   *  position: {
   *    x: 100,
   *    y: 80,
   *  },
   * });
   *
   * modeler.updateElement(element, {
   *  label: 'New label'
   * });
   * ```
   */
  public updateElement<T extends SbpmElement>(element: T, options: GetSbpmElementUpdateOptions<T>) {
    element.update(options);
  }

  /**
   * Update a link.
   *
   * @remark
   * The options will be automatically inferred based on the passed link.
   *
   * @param link The link to update.
   * @param options The options for the link.
   *
   * @example
   * Here is an example for a ProcessNetwork element:
   * ```
   * const link = modeler.createLink('ProcessTransition', {
   *  source: processNetwork,
   *  target: processModel,
   * });
   *
   * modeler.updateLink(link, {
   *  source: anotherProcessNetwork,
   * });
   * ```
   */
  public updateLink<T extends SbpmLink>(link: T, options: GetSbpmLinkUpdateOptions<T>) {
    link.update(options);
  }

  /**
   * Create a new element and add it to the canvas.
   *
   * @remark
   * The options will be automatically inferred based on the passed type.
   *
   * @param type The element type.
   * @param options The options for the element.
   * @returns The element instance.
   *
   * @example
   * Here is an example for a ProcessNetwork element:
   * ```
   * const element = modeler.addElement('ProcessNetwork', {
   *  label: 'Test',
   *  position: {
   *    x: 100,
   *    y: 80,
   *  },
   * });
   * ```
   */
  public addElement<Type extends SbpmElementType>(type: Type, options: GetSbpmElementOptions<Type>) {
    const element = this.createElement(type, options);
    element.addTo(this.#canvas.graph);
    return element;
  }

  /**
   * Create a new link and add it to the canvas.
   *
   * @remark
   * The options will be automatically inferred based on the passed type.
   *
   * @param type The link type.
   * @param options The options for the link.
   * @returns The link instance.
   *
   * @example
   * Here is an example for a ProcessTransition link:
   * ```
   * const link = modeler.addLink('ProcessTransition', {
   *  source: processNetwork,
   *  target: processModel,
   * });
   * ```
   */
  public addLink<Type extends SbpmLinkType>(type: Type, options: GetSbpmLinkOptions<Type>) {
    const link = this.createLink(type, options);
    link.addTo(this.#canvas.graph);
    return link;
  }

  public restoreView<ElementType extends SbpmElementType, LinkType extends SbpmLinkType>(view: SbpmView<ElementType, LinkType>) {
    this.#canvas.reset();
    this.#canvas.clear();

    const elements = view.filter(({ type }) => !isSbpmLinkType(type));
    const links = view.filter(({ type }) => isSbpmLinkType(type));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    elements.forEach(({ type, properties: options }) => this.addElement(type, options));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    links.forEach(({ type, properties: options }) => this.addLink(type, options));
  }
}
