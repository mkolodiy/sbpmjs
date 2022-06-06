import * as joint from 'jointjs';
import type { SbpmShapeAttributes } from '../common';
import SbpmElement from '../element';
import type { SbpmLinkToolsOptions } from '../link-tools';

export type SbpmLinkAttributes<T> = joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.LinkAttributes, SbpmLinkToolsOptions>;

export type SbpmLinkOptions<S = SbpmElement, T = SbpmElement> = {
  id?: string;
  source?: S;
  target?: T;
};
