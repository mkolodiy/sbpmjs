import * as joint from 'jointjs';

import {
  Event,
  ShapeType,
  CustomEvent,
  ShapeNamespace
} from './common/constants';
import { combineStrings, isCommonType } from './common/utils';
import { Coordinates, ModelerOptions } from './common/types';

/**
 * Default options used to create a new paper.
 */
const paperOptions = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0
  }
};

export default class Canvas {
  private graphInstance: joint.dia.Graph;
  private paperInstance: joint.dia.Paper;
  private dragStartPosition: Coordinates;

  /**
   * Constructor
   *
   * @param options [[ModelerOptions]] object containing all options for creating a new canvas.
   */
  public constructor(options: ModelerOptions) {
    const { container, routerName } = options;

    const defaultRouter = routerName
      ? { name: routerName }
      : { name: 'normal' };

    this.graphInstance = new joint.dia.Graph();
    this.paperInstance = new joint.dia.Paper({
      ...paperOptions,
      el: container,
      model: this.graphInstance,
      defaultRouter
    });
    this.dragStartPosition = null;

    this.addDragging(container);
    this.addOrigin();
    this.registerPaperEvents();
  }

  /**
   * Returns graph instance.
   *
   * @returns Joint graph.
   */
  public get graph() {
    return this.graphInstance;
  }

  /**
   * Returns paper instance.
   *
   * @returns Joint paper.
   */
  public get paper() {
    return this.paperInstance;
  }

  /**
   * Unhighlights all the elements on the canvas.
   */
  public unhighlightAllElements() {
    this.getElements().forEach((model: joint.dia.Element) => {
      this.paperInstance.findViewByModel(model).unhighlight();
    });
  }

  /**
   * Unhighlights one specific element on the canvas.
   *
   * @param model Joint element.
   */
  public unhighlightElement(model: joint.dia.Element) {
    model.findView(this.paperInstance).unhighlight();
  }

  /**
   * Get all elements on the canvas.
   */
  public getElements() {
    const allElements = this.graphInstance.getElements();
    return allElements.filter(
      (el: joint.dia.Element) =>
        !el.attributes.type.includes(ShapeNamespace.COMMON)
    );
  }

  /**
   * Get all links on the canvas.
   */
  public getLinks() {
    const allElements = this.graphInstance.getLinks();
    return allElements.filter(
      (el: joint.dia.Link) =>
        !el.attributes.type.includes(ShapeNamespace.COMMON)
    );
  }

  /**
   * Removes all shapes from the graph.
   */
  public clear() {
    this.graphInstance.clear();
    this.addOrigin();
  }

  /**
   * Sets canvas to origin.
   */
  public setToOrigin() {
    this.paperInstance.translate(0, 0);
  }

  /**
   * Triggers element pointer down event.
   *
   * @param element Joint element.
   */
  public triggerElementPointerdown(element: joint.dia.Element) {
    this.paperInstance.trigger(
      Event.ELEMENT_POINTERDOWN,
      this.paperInstance.findViewByModel(element)
    );
  }

  /**
   * Triggers link pointer down event.
   *
   * @param link Joint link.
   */
  public triggerLinkPointerdown(link: joint.dia.Link) {
    this.paperInstance.trigger(
      Event.LINK_POINTERDOWN,
      this.paperInstance.findViewByModel(link)
    );
  }

  /**
   * Hides tools of all shapes on the canvas.
   */
  public hideAllTools() {
    this.paperInstance.hideTools();
  }

  /**
   * Get element cell view;
   *
   * @param model Joint element.
   * @returns Joint cell view.
   */
  public getCellView(model: joint.dia.Element) {
    return this.paperInstance.findViewByModel(model);
  }

  /**
   * React to user clicking on an element.
   *
   * @param cb Callback function that is executed when the user clicks on an element.
   */
  public onElementSelected(cb: (cellView?: joint.dia.CellView) => void) {
    this.paperInstance.on(Event.ELEMENT_POINTERDOWN, cb);
  }

  /**
   * React to user clicking on a link.
   *
   * @param cb Callback function that is executed when the user clicks on a link.
   */
  public onLinkSelected(cb: (cellView?: joint.dia.CellView) => void) {
    this.paperInstance.on(Event.LINK_POINTERDOWN, cb);
  }

  /**
   * Get model from a point.
   *
   * @param coordinates [[Coordinates]] object.
   */
  public findModelFromPoint(coordinates: Coordinates) {
    const models = this.graphInstance
      .findModelsFromPoint(coordinates)
      .filter(
        (model: joint.dia.Element) => !isCommonType(model.attributes.type)
      );
    return models[0];
  }

  /**
   * Get view from a point.
   *
   * @param coordinates [[Coordinates]] object.
   */
  public findViewFromPoint(coordinates: Coordinates) {
    const views = this.paper
      .findViewsFromPoint(coordinates)
      .filter(
        (view: joint.dia.ElementView) =>
          !isCommonType(view.model.attributes.type)
      );
    return views[0];
  }

  /**
   * Add dragging to the canvas.
   *
   * @param container HTML element where the canvas will be rendered.
   */
  private addDragging(container: Element) {
    this.paperInstance.on(
      Event.BLANK_POINTERDOWN,
      (event: MouseEvent, x: number, y: number) => {
        this.dragStartPosition = { x: x, y: y };
      }
    );

    const pointerupEvents = combineStrings([
      Event.CELL_POINTERUP,
      Event.BLANK_POINTERUP
    ]);
    this.paperInstance.on(pointerupEvents, () => {
      this.dragStartPosition = null;
    });

    container.addEventListener(
      Event.MOUSEMOVE,
      (event: MouseEvent) => {
        if (this.dragStartPosition !== null) {
          const scale = this.paperInstance.scale();

          const x = event.offsetX - this.dragStartPosition.x * scale.sx;
          const y = event.offsetY - this.dragStartPosition.y * scale.sy;

          this.paperInstance.translate(x, y);
        }
      },
      true
    );
  }

  /**
   * Adds origin point to the canvas.
   */
  private addOrigin() {
    const Origin = joint.shapes.standard.Rectangle.define(
      ShapeType.ORIGIN,
      {
        attrs: {
          x: -20,
          y: -20,
          width: 40,
          height: 40,
          verticalLine: {
            xAlignment: 'middle',
            yAlignment: 'middle',
            width: 3,
            height: 40,
            fill: '#000',
            opacity: 0.25,
            pointerEvents: 'none'
          },
          horizontalLine: {
            xAlignment: 'middle',
            yAlignment: 'middle',
            width: 40,
            height: 3,
            fill: '#000',
            opacity: 0.25,
            pointerEvents: 'none'
          },
          text: {
            textVerticalAnchor: 'middle',
            textAnchor: 'middle',
            refX: '50%',
            refY: '50%',
            fill: '#000',
            opacity: 0.25,
            text: '(0,0)',
            pointerEvents: 'none'
          }
        }
      },
      {
        markup: [
          {
            tagName: 'rect',
            selector: 'verticalLine'
          },
          {
            tagName: 'rect',
            selector: 'horizontalLine'
          },
          {
            tagName: 'text',
            selector: 'text'
          }
        ]
      }
    );

    const origin = new Origin();
    origin.resize(40, 40);
    origin.addTo(this.graphInstance);
  }

  /**
   * Registers all necessary events needed for the interaction with the canvas and elements on the canvas.
   */
  private registerPaperEvents() {
    this.paperInstance.on(Event.BLANK_POINTERDOWN, () => {
      this.paperInstance.hideTools();
    });

    this.paperInstance.on(
      combineStrings([Event.ELEMENT_POINTERDOWN, Event.LINK_POINTERDOWN]),
      (cellView: joint.dia.CellView) => {
        this.paperInstance.hideTools();
        cellView.model.toFront();
      }
    );
  }
}
