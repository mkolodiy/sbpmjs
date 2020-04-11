import * as joint from 'jointjs';
import Canvas from '../canvas';
import { LinkOptions, LinkCreationOptions } from '../common/types';
import { Event, CUSTOM_EVENTS } from '../common/constants';
import { combineStrings } from '../common/utils';
import {
  createLinkTools,
  createLabelBasedLinkTools
} from '../shape-tools/link-tools';
import { elementLinkMapping } from '../shapes/mappings';

/**
 * Options used to create a new anchor.
 */
const anchorOptions = {
  anchor: {
    name: 'modelCenter'
  }
};

export default class LinkFactory {
  private _canvas: Canvas;
  private _link: joint.dia.Link;
  private _drawConnection: boolean;

  /**
   * Creates a new link and saves it internally.
   *
   * @param creationOptions [[LinkCreationOptions]] object containing all options used to create a new link.
   * @returns A new link.
   */
  public add<A extends LinkOptions>(
    creationOptions: LinkCreationOptions<A>
  ): joint.dia.Link {
    this._canvas.hideAllTools();
    this._link = this.create(creationOptions);
    return this._link;
  }

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object used to register joint events.
   * @param container [[Element]] object used to register DOM events.
   */
  constructor(canvas: Canvas, container: Element) {
    this._canvas = canvas;
    this._link = null;
    this._drawConnection = false;
    this.registerEvents(container);
  }

  /**
   * Creates a new link.
   *
   * @param creationOptions [[LinkCreationOptions]] object containing all options used to create a new link.
   * @returns A new link.
   */
  private create<A extends LinkOptions>(
    creationOptions: LinkCreationOptions<A>
  ) {
    const { options, iconLabel } = creationOptions;
    const { source, target } = options;

    const linkModel = new joint.shapes.standard.Link(creationOptions);
    linkModel.source(source, anchorOptions);
    linkModel.target(target, anchorOptions);

    linkModel.insertLabel(0, iconLabel);
    linkModel.addTo(this._canvas.graph);

    const linkView = linkModel.findView(this._canvas.paper);
    this.addTools(linkView);
    this.addLabelBasedTools(linkModel);

    return linkModel;
  }

  /**
   * Registers all necessary events needed for the interaction with a link.
   *
   * @param container [[Element]] object used to register DOM events.
   */
  private registerEvents(container: Element) {
    this._canvas.paper.on(
      combineStrings([Event.CELL_POINTERDOWN, Event.BLANK_POINTERDOWN]),
      () => this.reset()
    );

    this._canvas.paper.on(Event.LINK_POINTERDOWN, this.onLinkPointerDown);

    container.addEventListener(Event.MOUSEMOVE, this.onMouseMove);

    container.addEventListener(Event.MOUSEUP, this.onMouseUp);

    this._canvas.paper.on(
      combineStrings(CUSTOM_EVENTS),
      this.onCustomEventHandler
    );
  }

  /**
   * Shows link tools. Also sets currently selected link.
   *
   * @param view Joint link view.
   */
  private onLinkPointerDown = (view: joint.dia.LinkView) => {
    const { model } = view;
    view.showTools();
    this.addLabelBasedTools(model);
    this._link = model;
  };

  /**
   * Adds a new link when the user clicks the link button in the element tools.
   *
   * @param evt Joint event.
   * @param view Joint link view.
   */
  private onCustomEventHandler = (
    evt: joint.dia.Event,
    view: joint.dia.ElementView
  ) => {
    evt.stopPropagation();
    view.hideTools();
    this._drawConnection = true;
    const { type } = view.model.attributes;
    const coordinates = this._canvas.paper.snapToGrid({
      x: evt.clientX,
      y: evt.clientY
    });
    const options: LinkOptions = {
      source: view.model,
      target: coordinates
    };

    const creationOptions: LinkCreationOptions<LinkOptions> = elementLinkMapping[
      type
    ](options);

    this.add(creationOptions);
  };

  /**
   * Dynamically changes the target of the link while a user moves the mouse curser across the canvas.
   */
  private onMouseMove = (evt: MouseEvent) => {
    if (this.createConnection()) {
      const coordinates = this._canvas.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      this._link.target(coordinates);
      const view = this._canvas.findViewFromPoint(coordinates);
      if (view) {
        view.highlight();
      } else {
        this._canvas.unhighlightAllElements();
      }
    }
  };

  /**
   * Links a link to a target element.
   *
   * @param evt [[MouseEvent]] object.
   */
  private onMouseUp = (evt: MouseEvent) => {
    if (this.createConnection()) {
      const coordinates = this._canvas.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      const element = this._canvas.findModelFromPoint(coordinates);
      if (element) {
        this._canvas.unhighlightElement(element);
        this._link.target(element, anchorOptions);
      } else {
        this._link.remove();
        this.reset();
      }
      this._drawConnection = false;
    }
  };

  /**
   * Removes label based link tools from currently selected link instance.
   */
  private removeLabelBasedTools() {
    if (this._link !== null) {
      const labels = this._link.labels();
      labels.slice(1).forEach(l => this._link.removeLabel(-1));
    }
  }

  /**
   * Adds link tools to a link.
   *
   * @param view Joint link view.
   */
  private addTools(view: joint.dia.CellView) {
    const tools = createLinkTools();
    view.addTools(tools);
    view.showTools();
  }

  /**
   * Adds label based link tools.
   *
   * @param model Joint link model.
   */
  private addLabelBasedTools(model: joint.dia.Link) {
    const { labelBasedLinkToolsOptions } = model.attributes;
    const tools = createLabelBasedLinkTools(labelBasedLinkToolsOptions);
    tools.forEach((label: joint.dia.Link.Label, i: number) =>
      model.insertLabel(i + 1, label)
    );
  }

  /**
   * Resets all internal variables and calls [[removeLabelBasedTools]] method.
   */
  private reset() {
    this.removeLabelBasedTools();
    this._link = null;
    this._drawConnection = false;
  }

  /**
   * Indicates if a link should be created between two elements.
   */
  private createConnection() {
    return this._link !== null && this._drawConnection;
  }
}
