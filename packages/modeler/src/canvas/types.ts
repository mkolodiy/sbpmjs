import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import SbpmLinkView from '../link-view';

export const JointEvent = {
  BLANK_POINTERDOWN: 'blank:pointerdown',
  ELEMENT_POINTERDOWN: 'element:pointerdown',
  LINK_POINTERDOWN: 'link:pointerdown',
  LINK_CONNECT: 'link:connect',
} as const;

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
