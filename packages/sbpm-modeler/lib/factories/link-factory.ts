import * as joint from 'jointjs';
import Canvas from '../elements/canvas';
import { ILinkOptions, MessageOptions } from '../types';
import { Shapes, Events, CustomEvents } from '../variables';
import { combineStrings } from '../common/utils';
import {
  createLinkTools,
  createLabelBasedLinkTools
} from '../common/link-tools';

const anchorDefaults = {
  anchor: {
    name: 'modelCenter'
  }
};

export default abstract class LinkFactory {
  private canvas: Canvas;
  private link: joint.dia.Link;
  private drawConnection: boolean;

  public add(options: ILinkOptions): joint.dia.Link {
    this.link = this.create(options);
    return this.link;
  }

  constructor(container: Element, customEvent: string) {
    this.canvas = Canvas.getInstance();
    this.link = null;
    this.drawConnection = false;
    this.registerEvents(container, customEvent);
  }

  /**
   * Creates a new link.
   *
   * @param options [[ILinkOptions]] object used to create a new link.
   * @returns A new link.
   */
  private create(options: ILinkOptions) {
    const { graph, paper } = this.canvas;
    const { source, target } = options;

    const linkModel = new joint.shapes.standard.Link({
      ...this.getDefaults(),
      type: Shapes.MESSAGE
    });
    linkModel.source(source, anchorDefaults);
    linkModel.target(target, anchorDefaults);

    this.addIconLabel(linkModel);
    linkModel.addTo(graph);

    const linkView = linkModel.findView(paper);
    this.addTools(linkView);
    this.addLabelBasedTools(linkModel);

    return linkModel;
  }

  /**
   * Registers all necessary events needed for the interaction with a link.
   */
  private registerEvents(container: Element, customEvent: string) {
    const { paper } = this.canvas;

    paper.on(
      combineStrings([Events.CELL_POINTERDOWN, Events.BLANK_POINTERDOWN]),
      () => this.reset()
    );

    paper.on(Events.LINK_POINTERDOWN, this.onLinkPointerDown);

    paper.on(customEvent, this.onCustomEventHandler);

    container.addEventListener(Events.MOUSEMOVE, this.onMouseMove);

    container.addEventListener(Events.MOUSEUP, this.onMouseUp);
  }

  /**
   * Shows link tools. Also sets currently selected link instance.
   */
  private onLinkPointerDown = (view: joint.dia.LinkView) => {
    const { model } = view;
    const { type } = model.attributes;

    if (type === Shapes.MESSAGE) {
      view.showTools();
      this.addLabelBasedTools(model);
      this.link = model;
    }
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

    const options: MessageOptions = {
      source: view.model,
      target: {
        x: evt.clientX,
        y: evt.clientY
      }
    };

    this.add(options);
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
    const tools = createLabelBasedLinkTools();
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

  /**
   * Returns default options needed for the creation of the link.
   */
  protected abstract getDefaults(): {};

  /**
   * Adds send state transition icon as a label.
   *
   * @param model Jointjs model of the link.
   */
  protected abstract addIconLabel(model: joint.shapes.standard.Link): void;
}
