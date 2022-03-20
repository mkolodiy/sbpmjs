import * as joint from 'jointjs';
import type { SbpmShapeAttributes } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';

export type SbpmElementAttributes<T> = joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.ImageAttributes, SbpmElementToolsOptions>;

export type SbpmElementOptions = {
  id?: string;
  label: string;
  position: joint.dia.Point;
};
