import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import SbpmLinkView from '../link-view';
import { JointEvent } from './constants';

export type EventMap = joint.dia.Paper.EventMap & {
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
};
