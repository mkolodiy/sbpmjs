import * as joint from 'jointjs';
import { SbpmShapeNamespace, CustomEvent, JointEvent, combineStrings } from './common';
import { SbpmCanvasOrigin, SbpmElement, SbpmElementView, SbpmLink, SbpmLinkView } from './core';
import { getDefaultLink, isValidConnection } from './sbpm';

const paperOptions: joint.dia.Paper.Options = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0,
  },
  interactive: {
    linkMove: true,
    labelMove: false,
  },
  defaultConnectionPoint: {
    name: 'bbox',
    args: {
      offset: 10,
    },
  },
  elementView,
  linkView,
  defaultLink,
  validateConnection,
};

function elementView() {
  return SbpmElementView;
}

function linkView() {
  return SbpmLinkView;
}

function defaultLink(cellView: joint.dia.CellView) {
  // const { getDefaultLink } = await import('../sbpm');
  const sbpmElementView = cellView as SbpmElementView;
  const type = sbpmElementView.element.get('type');
  console.log(getDefaultLink(type));
  return getDefaultLink(type);
  // return new SbpmLink();
}

function validateConnection(
  cellViewS: joint.dia.CellView,
  _magnetS: unknown,
  cellViewT: joint.dia.CellView,
  _magnetT: unknown,
  _end: joint.dia.LinkEnd,
  linkView: joint.dia.LinkView
) {
  return isValidConnection(cellViewS, cellViewT, linkView);
}

type EventMap = joint.dia.Paper.EventMap & {
  [JointEvent.ELEMENT_POINTERDOWN]: (elementView: SbpmElementView, evt: joint.dia.Event, x: number, y: number) => void;
  [JointEvent.LINK_POINTERDOWN]: (linkView: SbpmLinkView, evt: joint.dia.Event, x: number, y: number) => void;
  [JointEvent.LINK_CONNECT]: (
    linkView: SbpmLinkView,
    evt: joint.dia.Event,
    newCellView: joint.dia.CellView,
    newCellViewMagnet: SVGElement,
    arrowhead: joint.dia.LinkEnd
  ) => void;
};

export type SbpmModelerOptions = {
  container: HTMLElement;
  onSelectElement?: (element: SbpmElement) => void;
  onSelectLink?: (element: SbpmLink) => void;
  onDeleteElement?: (element: SbpmElement) => void;
  onDeleteLink?: (element: SbpmLink) => void;
  onOpenElement?: (element: SbpmElement) => void;
  onOpenLink?: (element: SbpmLink) => void;
};

export class SbpmCanvas {
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

    this.#graph.on('element:updated', (element: SbpmElement) => {
      const elementView = this.#paper.findViewByModel<SbpmElementView>(element);
      elementView.refresh();
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
