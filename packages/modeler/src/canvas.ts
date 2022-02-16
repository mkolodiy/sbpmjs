import * as joint from 'jointjs';
import SbpmElementView from './element-view';
import type { SbpmModelerOptions } from './common/types';

const JointEvent = {
  BLANK_POINTERDOWN: 'blank:pointerdown',
  ELEMENT_POINTERDOWN: 'element:pointerdown',
} as const;

type EventMap = joint.dia.Paper.EventMap & {
  'element:pointerdown': (elementView: SbpmElementView, evt: joint.dia.Event, x: number, y: number) => void;
};

const paperOptions: joint.dia.Paper.Options = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0,
  },
  elementView: SbpmElementView,
};

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
  }

  get paper() {
    return this.#paper;
  }

  get graph() {
    return this.#graph;
  }

  private registerElementEvents() {
    this.#paper.on<keyof EventMap>(JointEvent.ELEMENT_POINTERDOWN, (sbpmElementView: SbpmElementView) => {
      sbpmElementView.select();
    });
  }

  private registerPaperEvents() {
    this.#paper.on(JointEvent.BLANK_POINTERDOWN, () => {
      this.#paper.hideTools();
    });
  }
}
