import * as joint from 'jointjs';

import Canvas from '../concrete-factories/canvas';
import { IElementOptions, IGenericOptions } from '../types';
import { Events, Shapes } from '../constants';

export default abstract class ElementFactory {
  protected canvas: Canvas;

  /**
   * Creates and adds a new element to the canvas.
   *
   * @param options [[IElementOptions]] object containing options used to create a new element.
   * @returns A new element object.
   */
  public add(options: IElementOptions) {
    const { graph } = this.canvas;
    return this.create(options).addTo(graph);
  }

  public abstract create(options: IElementOptions): joint.dia.Element;

  protected constructor() {
    this.canvas = Canvas.getInstance();
    this.registerEvents();
  }

  /**
   * Creates a new element.
   *
   * @param options [[IElementOptions]] object containing options used to create a new element.
   * @returns A new element object.
   */
  protected createInternal(options: IElementOptions) {
    const { description, position } = options;

    const element = new joint.shapes.basic.Image({
      ...options
    });

    element.position(position.x, position.y);
    element.attr('text/textWrap/text', description);

    return element;
  }

  /**
   * Registers all necessary events needed for the interaction with an element.
   */
  private registerEvents() {
    const { paper } = this.canvas;
    paper.on(Events.ELEMENT_POINTERDOWN, this.onElementPointerDown);
  }

  protected abstract onElementPointerDown(cellView: joint.dia.CellView): void;

  /**
   * Retrieves element defaults.
   *
   * @param machine Defines which icon should be used for the element
   * @returns Object with element defaults.
   */
  protected abstract getDefaults(condition?: boolean): {};

  /**
   * Retrieves a SVG icon used to display a element.
   *
   * @param condition Defines which icon should be used for the element.
   * @returns SVG icon.
   */
  protected abstract getIcon(condition?: boolean): string;
}
