import * as joint from 'jointjs';

import Canvas from '../canvas';
import { ElementOptions, GenericOptions } from '../common/types';
import { Event, ShapeType } from '../common/constants';

export default abstract class ElementFactory {
  protected canvas: Canvas;

  /**
   * Creates and adds a new element to the canvas.
   *
   * @param options [[IElementOptions]] object containing options used to create a new element.
   * @returns A new element object.
   */
  public add(options: ElementOptions) {
    const { graph } = this.canvas;
    return this.create(options).addTo(graph);
  }

  public abstract create(options: ElementOptions): joint.dia.Element;

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
  protected createInternal(options: ElementOptions) {
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
    paper.on(Event.ELEMENT_POINTERDOWN, this.onElementPointerDown);
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
