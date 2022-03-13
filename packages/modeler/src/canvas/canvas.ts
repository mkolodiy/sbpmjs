import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import type { SbpmModelerOptions } from '../common';
import { paperOptions } from './options';
import { JointEvent } from './types';
import type { EventMap } from './types';
import SbpmLinkView from '../link-view';
import SbpmCanvasOrigin from '../origin';

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

    this.addOrigin();
    this.addDragging(container);
    this.registerPaperEvents();
    this.registerElementEvents();
    this.registerLinkEvents();
  }

  get paper() {
    return this.#paper;
  }

  get graph() {
    return this.#graph;
  }

  private addOrigin() {
    this.#graph.addCell(new SbpmCanvasOrigin());
  }

  private addDragging(container: HTMLElement) {
    this.#paper.on('blank:pointerdown', (_evt: joint.dia.Event, x: number, y: number) => {
      this.#dragStartPosition = { x, y };
    });

    this.#paper.on('cell:pointerup blank:pointerup', () => {
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

  private registerElementEvents() {
    this.#paper.on<keyof EventMap>(JointEvent.ELEMENT_POINTERDOWN, (sbpmElementView: SbpmElementView) => {
      this.#paper.hideTools();
      sbpmElementView.select();
    });
  }

  private registerLinkEvents() {
    this.#paper.on<keyof EventMap>(JointEvent.LINK_POINTERDOWN, (linkView: SbpmLinkView) => {
      this.#paper.hideTools();
      linkView.select();
    });
  }

  private registerPaperEvents() {
    this.#paper.on(JointEvent.BLANK_POINTERDOWN, () => {
      this.#paper.hideTools();
    });
  }
}
