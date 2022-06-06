import * as joint from 'jointjs';
import { FONT_FAMILY, openInNew } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';
import { singleProcessIcon } from './icon';

export const jointOptions: joint.shapes.standard.ImageAttributes = {
  size: {
    width: 130,
    height: 70,
  },
  attrs: {
    image: {
      width: 130,
      height: 70,
      cursor: 'pointer',
      xlinkHref: singleProcessIcon,
    },
    label: {
      textWrap: {
        width: 130,
        height: 180,
        text: 'Process network',
      },
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
  {
    type: 'open',
    options: {
      x: 164,
      markup: [
        {
          tagName: 'rect',
        },
        {
          tagName: 'image',
          attributes: {
            'xlink:href': openInNew,
          },
        },
        {
          tagName: 'title',
          textContent: 'Open',
        },
      ],
    },
  },
];
