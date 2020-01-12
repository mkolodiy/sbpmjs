import * as joint from 'jointjs';
import '../node_modules/jointjs/dist/joint.min.css';

import { ModelerOptions, SubjectOptions, Coordinates } from './types';
import { Errors } from './variables';
import { isValidObject } from './common/utils';
import Canvas from './elements/canvas';
import StandardSubjectFactory from './elements/standard-subject-factory';
import MessageFactory from './elements/message-factory';

export default class Modeler {
  private static _instance: Modeler;
  private _canvas: Canvas;
  private _ssf: StandardSubjectFactory;
  private _mf: MessageFactory;
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;
  private _lastCreatedMessage: joint.dia.Link = null;
  private _drawConnection: boolean = false;

  /**
   * Creates a new [[Modeler]] instance.
   *
   * @param options [[ModelerOptions]] object containing values needed to create a new [[Modeler]] instance.
   * @returns A new [[Modeler]] instance.
   * @throws Error when the [[Modeler]] instance is already initialized.
   * @throws Error when the modeler options are not valid.
   */
  public static initialize(options: ModelerOptions): Modeler {
    if (!isValidObject(options)) {
      throw new Error(Errors.INVALID_MODELER_OPTIONS);
    }

    if (!Modeler._instance) {
      Modeler._instance = new Modeler(options);
      return Modeler._instance;
    }

    throw new Error(Errors.INITIALIZATION);
  }

  /**
   * Retrieves the [[Modeler]] instance.
   *
   * @returns [[Modeler]] instance.
   * @throws Error when the modeler instance is not initialized.
   */
  public static getInstance(): Modeler {
    if (!Modeler._instance) {
      throw new Error(Errors.INSTANCE_RETRIEVAL);
    }

    return Modeler._instance;
  }

  constructor(options: ModelerOptions) {
    this._canvas = Canvas.initialize(options.el);
    this._graph = this._canvas.graph;
    this._paper = this._canvas.paper;
    this._ssf = StandardSubjectFactory.initialize();
    this._mf = MessageFactory.initialize();

    this._paper.on('element:addMessage', (evt: joint.dia.Event, view) => {
      evt.stopPropagation();
      console.log('element:addMessage');
      console.log(evt);
      console.log(view);
      this._drawConnection = true;
      const target = this._graph.getElements()[2];
      this._lastCreatedMessage = this._mf.add({
        source: view.model,
        target: {
          x: evt.clientX,
          y: evt.clientY
        }
      });
    });

    const { el } = options;

    el.addEventListener('mousemove', (evt: MouseEvent) => {
      const coordinates: Coordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      if (this._lastCreatedMessage !== null && this._drawConnection) {
        this._lastCreatedMessage.target(coordinates);
        const views = this._paper.findViewsFromPoint(coordinates);
        const view: joint.dia.ElementView = views[0] || null;

        if (view !== null) {
          view.highlight();
        } else {
          this._graph.getElements().forEach((el: joint.dia.Element) => {
            this._paper.findViewByModel(el).unhighlight();
          });
        }
      }
    });

    el.addEventListener('mouseup', (evt: MouseEvent) => {
      if (this._drawConnection) {
        const coordinates: Coordinates = {
          x: evt.clientX,
          y: evt.clientY
        };
        const elements = this._graph.findModelsFromPoint(coordinates);
        const element: joint.dia.Element = elements[0] || null;
        if (element !== null) {
          element.findView(this._paper).unhighlight();
          this._lastCreatedMessage.target(element);
        } else {
          this._lastCreatedMessage.remove();
        }
        this._drawConnection = false;
      }
    });
  }

  public get canvas() {
    return this._canvas;
  }

  public addStandardSubject(options: SubjectOptions) {
    this._ssf.add(options);
  }
}
