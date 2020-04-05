import * as joint from 'jointjs';
import Canvas from '../canvas';
import {
  ElementOptions,
  ElementCreationOptions,
  GenericOptions
} from '../common/types';
import { Event } from '../common/constants';
import { createElementTools } from '../shape-tools/element-tools';

export default class ElementFactory {
  private _canvas: Canvas;
  private _element: joint.dia.Element;

  /**
   * Get currently selected element.
   *
   * @returns Joint element.
   */
  public get selectedElement() {
    return this._element;
  }

  public getSelectedElementType() {
    const { type } = this.getSelectedElementAttributes();
    return type;
  }

  public getSelectedElementAttributes() {
    const { attributes } = this._element;
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
    this._element = this.create(creationOptions).addTo(this._canvas.graph);
    this.addElementTools(this._canvas.getCellView(this._element));
    return this._element;
  }

  public updateSelectedElement(options: GenericOptions) {
    if (!this._element) {
      throw Error('No element selected.');
    }

    for (let [key, value] of Object.entries(options)) {
      this._element.attr(key, value);
    }
  }

  public removeSelectedElement() {
    this._element.remove();
    this._element = null;
  }

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object used to register events.
   */
  public constructor(canvas: Canvas) {
    this._canvas = canvas;
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
    const { jointOptions, options, icon, type, toolsOptions } = creationOptions;
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
    this._canvas.paper.on(
      Event.ELEMENT_POINTERDOWN,
      (cellView: joint.dia.CellView) => {
        this.addElementTools(cellView);
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
    cellView.addTools(createElementTools(toolsOptions));
  }
}
