import * as joint from 'jointjs';
import SbpmElementView from '../element-view';

export const JointEvent = {
  BLANK_POINTERDOWN: 'blank:pointerdown',
  ELEMENT_POINTERDOWN: 'element:pointerdown',
  LINK_POINTERDOWN: 'link:pointerdown',
} as const;

export type EventMap = joint.dia.Paper.EventMap & {
  'element:pointerdown': (elementView: SbpmElementView, evt: joint.dia.Event, x: number, y: number) => void;
};
