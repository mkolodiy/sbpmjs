import * as joint from 'jointjs';
import { FONT_FAMILY } from '../common';
import type { SbpmElementToolsOptions } from '../common';
import { icon } from './icon';

export const jointOptions: joint.shapes.standard.ImageAttributes = {
  size: {
    width: 130,
    height: 130,
  },
  attrs: {
    image: {
      width: 130,
      height: 130,
      cursor: 'pointer',
      xlinkHref: icon,
    },
    label: {
      textWrap: {
        width: 130,
      },
      text: 'Process network',
      fontFamily: FONT_FAMILY,
      pointerEvents: 'none',
    },
  },
};

export const toolsOptions: SbpmElementToolsOptions = [
  {
    type: 'remove',
    options: {
      x: 140,
    },
  },
];
