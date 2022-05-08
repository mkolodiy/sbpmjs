import * as joint from 'jointjs';
import { SbpmShapeNamespace } from '../common';
import { CustomEvent, JointEvent } from './constants';
import SbpmCanvasOrigin from '../origin';
import SbpmElement from '../element';
import SbpmElementView from '../element-view';
import SbpmLink from '../link';
import SbpmLinkView from '../link-view';
import { paperOptions } from './options';
import type { EventMap } from './types';
import { combineStrings } from './utils';
import type { SbpmModelerOptions } from '../modeler';

export default class SbpmCanvas {
  #graph: joint.dia.Graph;
  #paper: joint.dia.Paper;
  #dragStartPosition: joint.dia.Point | undefined;

  constructor(options: SbpmModelerOptions) {
    const { container } = options;

    this.#graph = new joint.dia.Graph();
    this.#paper = new joint.dia.Paper({
      ...paperOptions,
      el: container,
      model: this.#graph,
      defaultRouter: { name: 'normal' },
    });
    this.#paper.$el.css('cursor', 'grab');

    this.addOrigin();
    this.addDragging(options);
    this.registerPaperEvents();
    this.registerElementEvents(options);
    this.registerLinkEvents(options);
  }

  private addOrigin() {
    this.#graph.addCell(new SbpmCanvasOrigin());
  }

  private addDragging({ container }: SbpmModelerOptions) {
    this.#paper.on(JointEvent.BLANK_POINTERDOWN, (_evt: joint.dia.Event, x: number, y: number) => {
      this.#dragStartPosition = { x, y };
    });

    this.#paper.on(combineStrings([JointEvent.CELL_POINTERUP, JointEvent.BLANK_POINTERUP]), () => {
      this.#dragStartPosition = undefined;
    });

    container.addEventListener(
      'mousemove',
      (evt: MouseEvent) => {
        if (this.#dragStartPosition !== undefined) {
          const scale = this.#paper.scale();

          const x = evt.offsetX - this.#dragStartPosition.x * scale.sx;
          const y = evt.offsetY - this.#dragStartPosition.y * scale.sy;

          this.#paper.translate(x, y);
        }
      },
      true
    );
  }

  private registerElementEvents({ onSelectElement }: SbpmModelerOptions) {
    this.#paper.on<keyof EventMap>(JointEvent.ELEMENT_POINTERDOWN, (sbpmElementView: SbpmElementView) => {
      this.deselect();
      sbpmElementView.select();
      onSelectElement?.(sbpmElementView.element);
    });
  }

  private registerLinkEvents({ onSelectLink, onDeleteLink }: SbpmModelerOptions) {
    this.#paper.on<keyof EventMap>(JointEvent.LINK_POINTERDOWN, (linkView: SbpmLinkView) => {
      this.deselect();
      linkView.select();
      onSelectLink?.(linkView.link);
    });

    this.#paper.on(CustomEvent.LINK_REMOVE, (linkView: SbpmLinkView, evt: MouseEvent) => {
      evt.stopPropagation();
      linkView.link.remove();
      onDeleteLink?.(linkView.link);
    });

    this.#paper.on(CustomEvent.LINK_REMOVE_VERTICES, (linkView: SbpmLinkView, evt: MouseEvent) => {
      evt.stopPropagation();
      linkView.link.vertices([]);
    });
  }

  private registerPaperEvents() {
    this.#paper.on(JointEvent.BLANK_POINTERDOWN, () => {
      this.#paper.$el.css('cursor', 'grabbing');
      this.deselect();
    });

    this.#paper.on(JointEvent.BLANK_POINTERUP, () => {
      this.#paper.$el.css('cursor', 'grab');
      this.deselect();
    });
  }

  public get paper() {
    return this.#paper;
  }

  public get graph() {
    return this.#graph;
  }

  public getElements() {
    const allElements = this.#graph.getElements();
    return allElements.filter((element: joint.dia.Element) => !element.get('type').includes(SbpmShapeNamespace.COMMON)) as SbpmElement[];
  }

  public getLinks() {
    const allLinks = this.#graph.getLinks();
    return allLinks.filter((link: joint.dia.Link) => !link.get('type').includes(SbpmShapeNamespace.COMMON)) as SbpmLink[];
  }

  public deselect() {
    this.#paper.hideTools();
    this.getElements().forEach((element) => element.deselect());
    this.getLinks().forEach((link) => link.deselect());
  }

  public reset() {
    this.#paper.translate(0, 0);
  }

  public clear() {
    this.#graph.clear();
    this.addOrigin();
    this.reset();
  }
}
