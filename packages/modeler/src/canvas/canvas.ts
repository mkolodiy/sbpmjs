import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import type { SbpmModelerOptions } from '../common';
import { paperOptions } from './options';
import { JointEvent } from './types';
import type { EventMap } from './types';
import SbpmLinkView from '../link-view';

export default class SbpmCanvas {
  #graph: joint.dia.Graph;
  #paper: joint.dia.Paper;

  constructor(options: SbpmModelerOptions) {
    const { container } = options;

    this.#graph = new joint.dia.Graph();
    this.#paper = new joint.dia.Paper({
      ...paperOptions,
      el: container,
      model: this.#graph,
      defaultRouter: { name: 'normal' },
    });

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
