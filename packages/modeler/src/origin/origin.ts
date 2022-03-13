import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
import { attrs, markup } from './options';

export const SbpmCanvasOrigin = joint.shapes.standard.Rectangle.define(
  SbpmElementType.ORIGIN,
  {
    attrs,
  },
  {
    markup,
  }
);
