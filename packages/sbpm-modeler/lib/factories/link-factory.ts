import * as joint from 'jointjs';
import Canvas from '../canvas';
import {
  LinkOptions,
  LinkCreationOptions,
  GenericOptions
} from '../common/types';
import { Event, CUSTOM_EVENTS, CustomEvent } from '../common/constants';
import { combineStrings } from '../common/utils';
import {
  createLinkTools,
  createLabelBasedLinkTools
} from '../shape-tools/link-tools';
import { elementLinkMapping, updateOptionsMapping } from '../shapes/mappings';

/**
 * Options used to create a new anchor.
 */
const anchorOptions = {
  anchor: {
    name: 'modelCenter'
  }
};

export default class LinkFactory {
  private canvas: Canvas;
  private link: joint.dia.Link;
  private drawConnection: boolean;

  /**
   * Get currently selected link.
   *
   * @returns Joint element.
   */
  public get selectedLink() {
    return this.link;
  }

  /**
   * Get selected link type.
   */
  public getSelectedLinkType() {
    const { type } = this.getSelectedLinkAttributes();
    return type;
  }

  /**
   * Get selected link attributes.
   */
  public getSelectedLinkAttributes() {
    const { attributes } = this.link;
    return attributes;
  }

  /**
   * Creates a new link and saves it internally.
   *
   * @param creationOptions [[LinkCreationOptions]] object containing all options used to create a new link.
   * @returns A new link.
   */
  public add<A extends LinkOptions>(
    creationOptions: LinkCreationOptions<A>
  ): joint.dia.Link {
    this.canvas.hideAllTools();
    this.removeLabelBasedTools();
    this.link = this.create(creationOptions);
    return this.link;
  }

  /**
   * Updates a given link or as fallback a currently selected link.
   *
   * @param options Update options.
   * @param link Link to update.
   * @throws Error when no link was passed as a parameter and if no link is selected on canvas.
   */
  public update(options: GenericOptions, link?: joint.dia.Link) {
    if (!this.link && !link) {
      throw Error('No link selected.');
    }
    const linkToUpdate = link ?? this.link;
    linkToUpdate.label(0, options);
  }

  public addSourceMarker(condition: boolean, link?: joint.dia.Link) {
    const linkToUpdate = link ?? this.link;
    if (Boolean(condition)) {
      linkToUpdate.attr('line/sourceMarker', {
        type: 'path',
        d: 'M 10 -5 0 0 10 5 z'
      });
    } else {
      linkToUpdate.removeAttr('line/sourceMarker');
    }
  }

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object used to register joint events.
   * @param container [[Element]] object used to register DOM events.
   */
  constructor(canvas: Canvas, container: Element) {
    this.canvas = canvas;
    this.link = null;
    this.drawConnection = false;
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
    const { options, iconLabel, type } = creationOptions;
    const { source, target, ...updateOptions } = options;

    const linkModel = new joint.shapes.standard.Link(creationOptions);
    linkModel.source(source, anchorOptions);
    linkModel.target(target, anchorOptions);

    linkModel.insertLabel(0, iconLabel);
    this.update(updateOptionsMapping[type](updateOptions), linkModel);
    linkModel.addTo(this.canvas.graph);

    const linkView = linkModel.findView(this.canvas.paper);
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
    this.canvas.paper.on(
      combineStrings([Event.CELL_POINTERDOWN, Event.BLANK_POINTERDOWN]),
      () => this.reset()
    );

    this.canvas.paper.on(Event.LINK_POINTERDOWN, this.onLinkPointerDown);

    container.addEventListener(Event.MOUSEMOVE, this.onMouseMove);

    container.addEventListener(Event.MOUSEUP, this.onMouseUp);

    this.canvas.paper.on(
      combineStrings(CUSTOM_EVENTS),
      this.onCustomEventHandler
    );

    this.canvas.paper.on(
      CustomEvent.LINK_REMOVE_VERTICES,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.vertices([]);
      }
    );

    this.canvas.paper.on(
      CustomEvent.LINK_REMOVE,
      (view: joint.dia.LinkView, evt: MouseEvent) => {
        evt.stopPropagation();
        view.model.remove();
      }
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
    this.link = model;
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
    this.drawConnection = true;
    const { type } = view.model.attributes;
    const coordinates = this.canvas.paper.snapToGrid({
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
      const coordinates = this.canvas.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      this.link.target(coordinates);
      const view = this.canvas.findViewFromPoint(coordinates);
      if (view) {
        view.highlight();
      } else {
        this.canvas.unhighlightAllElements();
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
      const coordinates = this.canvas.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      const element = this.canvas.findModelFromPoint(coordinates);
      if (element) {
        this.canvas.unhighlightElement(element);
        this.link.target(element, anchorOptions);
      } else {
        this.link.remove();
        this.reset();
      }
      this.drawConnection = false;
    }
  };

  /**
   * Removes label based link tools from currently selected link instance.
   */
  private removeLabelBasedTools() {
    if (this.link !== null) {
      const labels = this.link.labels();
      labels.slice(1).forEach(l => this.link.removeLabel(-1));
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
    this.link = null;
    this.drawConnection = false;
  }

  /**
   * Indicates if a link should be created between two elements.
   */
  private createConnection() {
    return this.link !== null && this.drawConnection;
  }
}
