import * as joint from 'jointjs';

import Canvas from '../canvas';
import { ElementOptions, ElementCreationOptions } from '../common/types';
import { Event, ShapeType } from '../common/constants';
import { createElementTools } from '../common/element-tools';

export default class ElementFactory {
  protected canvas: Canvas;

  /**
   * Creates and adds a new element to the canvas.
   *
   * @param options [[IElementOptions]] object containing options used to create a new element.
   * @returns A new element object.
   */
  public add<A extends ElementOptions>(
    creationOptions: ElementCreationOptions<A>
  ): joint.shapes.basic.Image {
    const { graph } = this.canvas;
    return this.create(creationOptions).addTo(graph);
  }

  public constructor() {
    this.canvas = Canvas.getInstance();
    this.registerEvents();
  }

  private create<A extends ElementOptions>(
    creationOptions: ElementCreationOptions<A>
  ): joint.shapes.basic.Image {
    const { jointOptions, options, toolsOptions, icon, type } = creationOptions;
    const { position, description } = options;

    const element = new joint.shapes.basic.Image({
      ...jointOptions,
      ...(options as object),
      type,
      toolsOptions
    });

    element.attr('image/xlinkHref', icon);
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

  private onElementPointerDown(cellView: joint.dia.CellView): void {
    const { toolsOptions } = cellView.model.attributes;
    cellView.addTools(createElementTools(toolsOptions));
  }
}
