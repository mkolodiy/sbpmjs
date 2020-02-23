import * as joint from 'jointjs';

import Canvas from './canvas';
import { SendStateTransitionOptions, Coordinates } from '../types';
import { SVG_PREFIX, Errors, Shapes, Events, CustomEvents } from '../variables';
import {
  createLinkTools,
  createLabelBasedLinkTools1
} from '../common/link-tools';
import { combineStrings } from '../common/utils';

/**
 * Default options used to create a send state transition.
 */
const sendStateTransitionDefaults = {
  attrs: {
    wrapper: {
      pointerEvents: 'none'
    }
  }
};

const anchorDefaults = {
  anchor: {
    name: 'modelCenter'
  }
};

export default class SendStateTransitionFactory {
  private static _instance: SendStateTransitionFactory;
  private _canvas: Canvas;
  private _sendStateTransitionInstance: joint.dia.Link;
  private _drawConnection: boolean;

  /**
   * Creates a new [[SendStateTransitionFactory]] instance.
   *
   * @param container HTML element where the canvas will be rendered.
   * @returns [[SendStateTransitionFactory]] instance.
   * @throws Error when the [[SendStateTransitionFactory]] instance is already initialized.
   */
  public static initialize(container: Element): SendStateTransitionFactory {
    if (!SendStateTransitionFactory._instance) {
      SendStateTransitionFactory._instance = new SendStateTransitionFactory(
        container
      );
      return SendStateTransitionFactory._instance;
    }

    throw new Error(Errors.SSTF_INITIALIZATION);
  }

  /**
   * Retrieves the [[SendStateTransitionFactory]] instance.
   *
   * @returns [[SendStateTransitionFactory]] instance.
   * @throws Error when the [[SendStateTransitionFactory]] instance is not initialized.
   */
  public static getInstance(): SendStateTransitionFactory {
    if (!SendStateTransitionFactory._instance) {
      throw new Error(Errors.SSTF_INSTANCE_RETRIEVAL);
    }

    return SendStateTransitionFactory._instance;
  }

  /**
   * Creates and adds a new send state transition to the canvas.
   *
   * @param options [[SendStateTransitionOptions]] object used to create a new send state transition.
   * @returns A new send state transition.
   */
  public add(options: SendStateTransitionOptions) {
    this._sendStateTransitionInstance = this.create(options);
    return this._sendStateTransitionInstance;
  }

  constructor(container: Element) {
    this._canvas = Canvas.getInstance();
    this._sendStateTransitionInstance = null;
    this._drawConnection = false;
    this.registerEvents(container);
  }

  /**
   * Creates a new send state transition.
   *
   * @param options [[SendStateTransitionOptions]] object used to create a new send state transition.
   * @returns A new send state transition.
   */
  private create(options: SendStateTransitionOptions) {
    const { graph, paper } = this._canvas;
    const { source, target } = options;

    const sendStateTransitionModel = new joint.shapes.standard.Link({
      ...sendStateTransitionDefaults,
      type: Shapes.SEND_STATE_TRANSITION
    });
    sendStateTransitionModel.source(source, anchorDefaults);
    sendStateTransitionModel.target(target, anchorDefaults);

    this.addIconLabel(sendStateTransitionModel);
    sendStateTransitionModel.addTo(graph);

    const sendStateTransitionView = sendStateTransitionModel.findView(paper);
    this.addTools(sendStateTransitionView);
    this.addLabelBasedTools(sendStateTransitionModel);

    return sendStateTransitionModel;
  }

  /**
   * Registers all necessary events needed for the interaction with a subject.
   */
  private registerEvents(container: Element) {
    const { paper } = this._canvas;

    paper.on(
      combineStrings([Events.CELL_POINTERDOWN, Events.BLANK_POINTERDOWN]),
      () => this.reset()
    );

    paper.on(Events.LINK_POINTERDOWN, this.onLinkPointerDown);

    paper.on(
      CustomEvents.ELEMENT_ADD_SEND_STATE_TRANSITION,
      this.onElementAddMessage
    );

    container.addEventListener(Events.MOUSEMOVE, this.onMouseMove);

    container.addEventListener(Events.MOUSEUP, this.onMouseUp);
  }

  /**
   * Shows link tools. Also sets currently selected send state transition instance.
   */
  private onLinkPointerDown = (view: joint.dia.LinkView) => {
    const { model } = view;
    const { type } = model.attributes;

    if (type === Shapes.SEND_STATE_TRANSITION) {
      view.showTools();
      this.addLabelBasedTools(model);
      this._sendStateTransitionInstance = model;
    }
  };

  /**
   * Adds a new send state transition when the user clicks the link button in the subject tools.
   */
  private onElementAddMessage = (
    evt: joint.dia.Event,
    view: joint.dia.ElementView
  ) => {
    evt.stopPropagation();
    view.hideTools();
    this._drawConnection = true;

    const options: SendStateTransitionOptions = {
      source: view.model,
      target: {
        x: evt.clientX,
        y: evt.clientY
      }
    };

    this.add(options);
  };

  /**
   * Dynamically changes the target of the send state transition while a user moves the mouse curser across the canvas.
   */
  private onMouseMove = (evt: MouseEvent) => {
    if (this.drawConnection()) {
      const { paper } = this._canvas;
      const coordinates = paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      this._sendStateTransitionInstance.target(coordinates);
      const views = paper.findViewsFromPoint(coordinates);
      const view: joint.dia.ElementView = views[0] || null;

      if (view !== null) {
        view.highlight();
      } else {
        this._canvas.unhighlight();
      }
    }
  };

  /**
   * Links a send state transition to target subject.
   *
   * @param evt [[MouseEvent]] object.
   */
  private onMouseUp = (evt: MouseEvent) => {
    if (this.drawConnection()) {
      const { graph, paper } = this._canvas;
      const coordinates = paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      const elements = graph.findModelsFromPoint(coordinates);
      const element: joint.dia.Element = elements[0] || null;
      if (element !== null) {
        this._canvas.unhighlightElement(element);
        this._sendStateTransitionInstance.target(element, anchorDefaults);
      } else {
        this._sendStateTransitionInstance.remove();
        this.reset();
      }
      this._drawConnection = false;
    }
  };

  /**
   * Removes label based link tools from currently selected send state transition instance.
   */
  private removeLabelBasedTools() {
    if (this._sendStateTransitionInstance !== null) {
      const labels = this._sendStateTransitionInstance.labels();
      labels
        .slice(1)
        .forEach(l => this._sendStateTransitionInstance.removeLabel(-1));
    }
  }

  /**
   * Adds link tools to a send state transition.
   *
   * @param view Jointjs view of a send state transition.
   */
  private addTools(view: joint.dia.CellView) {
    const tools = createLinkTools();
    view.addTools(tools);
    view.showTools();
  }

  /**
   * Adds label based link tools.
   *
   * @param model Jointjs model of the send state transition.
   */
  private addLabelBasedTools(model: joint.dia.Link) {
    const tools = createLabelBasedLinkTools1();
    tools.forEach((label, i) => model.insertLabel(i + 1, label));
  }

  /**
   * Resets all internal variables and calls [[removeLabelBasedTools]] method.
   */
  private reset() {
    this.removeLabelBasedTools();
    this._sendStateTransitionInstance = null;
    this._drawConnection = false;
  }

  /**
   * Indicates if a send state transition should be created between two subject.
   */
  private drawConnection() {
    return this._sendStateTransitionInstance !== null && this._drawConnection;
  }

  /**
   * Adds send state transition icon as a label.
   *
   * @param model Jointjs model of the send state transition.
   */
  private addIconLabel(model: joint.shapes.standard.Link) {
    const iconLabel = {
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'rect',
          selector: 'header'
        },
        {
          tagName: 'text',
          selector: 'headerText'
        },
        {
          tagName: 'text',
          selector: 'bodyText'
        }
      ],
      attrs: {
        body: {
          width: 180,
          height: 60,
          strokeWidth: 2,
          stroke: '#b3b3b3ff',
          fill: '#FFFFFF',
          xAlignment: 'middle',
          yAlignment: 'middle',
          cursor: 'pointer'
        },
        header: {
          width: 180,
          height: 30,
          strokeWidth: 2,
          stroke: '#b3b3b3ff',
          fill: '#FFFFFF',
          xAlignment: 'middle',
          yAlignment: -30,
          cursor: 'pointer'
        },
        headerText: {
          xAlignment: 'middle',
          yAlignment: -25,
          textWrap: {
            text: 'Subject Test',
            width: 180,
            height: 30
          },
          title: 'Subject Test',
          cursor: 'pointer',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle'
        },
        bodyText: {
          xAlignment: 'middle',
          yAlignment: 5,
          textWrap: {
            text: 'Message Test',
            width: 180,
            height: 30
          },
          title: 'Message Test',
          cursor: 'pointer',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle'
        }
      }
    };

    model.insertLabel(0, iconLabel);
  }
}
