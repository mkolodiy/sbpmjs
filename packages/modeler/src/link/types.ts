import * as joint from 'jointjs';
import type { SbpmShapeAttributes } from '../common';
import type { SbpmLinkToolsOptions } from '../link-tools';

export type SbpmLinkAttributes<T> = joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.LinkAttributes, SbpmLinkToolsOptions>;

export type SbpmLinkOptions<S = unknown, T = unknown> = {
  id?: string;
  source?: S;
  target?: T;
};
