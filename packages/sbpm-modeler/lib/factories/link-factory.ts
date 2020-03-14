import * as joint from 'jointjs';
import Canvas from '../canvas';
import { LinkOptions, LinkCreationOptions } from '../common/types';
import { ShapeType, Event, CustomEvent } from '../common/constants';
import { combineStrings } from '../common/utils';
import {
  createLinkTools,
  createLabelBasedLinkTools
} from '../common/link-tools';
import elementToLinkMapping from '../shapes/elementToLinkMapping';

const anchorDefaults = {
  anchor: {
    name: 'modelCenter'
  }
};

export default class LinkFactory {
  private canvas: Canvas;
  private link: joint.dia.Link;
  private drawConnection: boolean;
  private type: ShapeType;

  public add<A extends LinkOptions>(
    creationOptions: LinkCreationOptions<A>
  ): joint.dia.Link {
    this.link = this.create(creationOptions);
    return this.link;
  }

  constructor(container: Element) {
    this.canvas = Canvas.getInstance();
    this.link = null;
    this.drawConnection = false;
    this.registerEvents(container);
  }

  private create<A extends LinkOptions>(
    creationOptions: LinkCreationOptions<A>
  ) {
    const { options, iconLabel } = creationOptions;
    const { graph, paper } = this.canvas;
    const { source, target } = options;

    const linkModel = new joint.shapes.standard.Link({
      ...creationOptions
    });
    linkModel.source(source, anchorDefaults);
    linkModel.target(target, anchorDefaults);

    linkModel.insertLabel(0, iconLabel);
    linkModel.addTo(graph);

    const linkView = linkModel.findView(paper);
    this.addTools(linkView);
    this.addLabelBasedTools(linkModel);

    return linkModel;
  }

  /**
   * Registers all necessary events needed for the interaction with a link.
   */
  private registerEvents(container: Element) {
    const { paper } = this.canvas;

    paper.on(
      combineStrings([Event.CELL_POINTERDOWN, Event.BLANK_POINTERDOWN]),
      () => this.reset()
    );

    paper.on(Event.LINK_POINTERDOWN, this.onLinkPointerDown);

    container.addEventListener(Event.MOUSEMOVE, this.onMouseMove);

    container.addEventListener(Event.MOUSEUP, this.onMouseUp);

    const customEvents = combineStrings([
      CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION
    ]);
    paper.on(customEvents, this.onCustomEventHandler);
  }

  /**
   * Shows link tools. Also sets currently selected link instance.
   */
  private onLinkPointerDown = (view: joint.dia.LinkView) => {
    const { model } = view;

    view.showTools();
    this.addLabelBasedTools(model);
    this.link = model;
  };

  /**
   * Adds a new link when the user clicks the link button in the element tools.
   */
  private onCustomEventHandler = (
    evt: joint.dia.Event,
    view: joint.dia.ElementView
  ) => {
    evt.stopPropagation();
    view.hideTools();
    this.drawConnection = true;

    const { type } = view.model.attributes;

    const options: LinkOptions = {
      source: view.model,
      target: {
        x: evt.clientX,
        y: evt.clientY
      }
    };

    const creationOptions: LinkCreationOptions<LinkOptions> = elementToLinkMapping[
      type
    ](options);

    this.add(creationOptions);
  };

  /**
   * Dynamically changes the target of the link while a user moves the mouse curser across the canvas.
   */
  private onMouseMove = (evt: MouseEvent) => {
    if (this.createConnection()) {
      const { paper } = this.canvas;
      const coordinates = paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      this.link.target(coordinates);
      const views = paper.findViewsFromPoint(coordinates);
      const view: joint.dia.ElementView = views[0] || null;

      if (view !== null) {
        view.highlight();
      } else {
        this.canvas.unhighlight();
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
      const { graph, paper } = this.canvas;
      const coordinates = paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      const elements = graph.findModelsFromPoint(coordinates);
      const element: joint.dia.Element = elements[0] || null;
      if (element !== null) {
        this.canvas.unhighlightElement(element);
        this.link.target(element);
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
   * @param view Jointjs view of a link.
   */
  private addTools(view: joint.dia.CellView) {
    const tools = createLinkTools();
    view.addTools(tools);
    view.showTools();
  }

  /**
   * Adds label based link tools.
   *
   * @param model Jointjs model of a link.
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
