import * as joint from 'jointjs';
import { FONT_FAMILY, openInNew } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';
import { humanSubjectIcon } from './icon';

export const jointOptions: joint.shapes.standard.ImageAttributes = {
  size: {
    width: 85,
    height: 140,
  },
  attrs: {
    image: {
      width: 85,
      height: 140,
      cursor: 'pointer',
      xlinkHref: humanSubjectIcon,
    },
    label: {
      textWrap: {
        width: 85,
        height: 180,
        text: 'Subject',
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
      x: 95,
    },
  },
  {
    type: 'connect',
    options: {
      x: 119,
    },
  },
  {
    type: 'open',
    options: {
      x: 143,
      markup: [
        {
          tagName: 'rect',
        },
        {
          tagName: 'image',
          attributes: {
            'xlink:href': openInNew,
            event: 'link:removeVertices',
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
