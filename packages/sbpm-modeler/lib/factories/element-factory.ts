import * as joint from 'jointjs';

import Canvas from '../canvas';
import {
  ElementOptions,
  ElementCreationOptions,
  GenericOptions
} from '../common/types';
import { Event } from '../common/constants';
import { createElementTools } from '../shape-tools/element-tools';
import { getDescriptionProperty } from '../shapes/common/helper';

export default class ElementFactory {
  private canvas: Canvas;
  private element: joint.dia.Element;

  /**
   * Get currently selected element.
   *
   * @returns Joint element.
   */
  public get selectedElement() {
    return this.element;
  }

  /**
   * Get selected element type.
   */
  public getSelectedElementType() {
    const { type } = this.getSelectedElementAttributes();
    return type;
  }

  /**
   * Get selected element attributes.
   */
  public getSelectedElementAttributes() {
    const { attributes } = this.element;
    return attributes;
  }

  /**
   * Creates and adds a new element to the canvas.
   *
   * @param options [[ElementCreationOptions]] object containing all options used to create a new element.
   * @returns A new element.
   */
  public add<A extends ElementOptions>(
    creationOptions: ElementCreationOptions<A>
  ): joint.shapes.basic.Image {
    this.element = this.create(creationOptions).addTo(this.canvas.graph);
    this.addElementTools(this.canvas.getCellView(this.element));
    return this.element;
  }

  /**
   * Updates a given element or as fallback a currently selected element.
   *
   * @param options Update options.
   * @param element Element to update.
   * @throws Error when no element was passed as a parameter and if no element is selected on canvas.
   */
  public update(options: GenericOptions, element?: joint.dia.Element) {
    if (!this.element && !element) {
      throw Error('No element selected.');
    }

    const elementToUpdate = element ?? this.element;
    const { size, ...otherAttributes } = options;

    for (let [key, value] of Object.entries(otherAttributes)) {
      elementToUpdate.prop(key, value);
    }

    if (size) {
      elementToUpdate.resize(size.width, size.height);
      this.addElementTools(this.canvas.paper.findViewByModel(elementToUpdate));
    }
  }

  /**
   * Removes currently selected element from canvas.
   */
  public removeSelectedElement() {
    this.element.remove();
    this.element = null;
  }

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object used to register events.
   */
  public constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.registerEvents();
  }

  /**
   * Creates a new element.
   *
   * @param creationOptions [[ElementCreationOptions]] object containing all options used to create a new element.
   * @returns A new element.
   */
  private create<A extends ElementOptions>(
    creationOptions: ElementCreationOptions<A>
  ): joint.shapes.basic.Image {
    const { jointOptions, options, type, toolsOptions } = creationOptions;
    const { position, description } = options;

    const element = new joint.shapes.basic.Image({
      ...jointOptions,
      ...(options as object),
      type,
      toolsOptions
    });

    element.position(position.x, position.y);
    this.update(
      {
        ...getDescriptionProperty(description)
      },
      element
    );

    return element;
  }

  /**
   * Registers all necessary events needed for the interaction with an element.
   */
  private registerEvents() {
    this.canvas.paper.on(
      Event.ELEMENT_POINTERDOWN,
      (cellView: joint.dia.CellView) => {
        this.addElementTools(cellView);
        this.element = this.canvas.findModelFromPoint(
          cellView.model.attributes.position
        );
      }
    );
  }

  /**
   * Adds element tools for given cell view.
   *
   * @param cellView Joint cell view.
   */
  private addElementTools(cellView: joint.dia.CellView) {
    const { toolsOptions } = cellView.model.attributes;
    cellView.addTools(createElementTools(toolsOptions, this.canvas.paper));
  }
}
