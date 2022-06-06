import * as joint from 'jointjs';
import { FONT_FAMILY } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';
import { icon } from './icon';

export const jointOptions: joint.shapes.standard.ImageAttributes = {
  markup: [
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'image',
      selector: 'stateModifier',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  size: {
    width: 90,
    height: 140,
  },
  attrs: {
    image: {
      xlinkHref: icon,
      width: 90,
      height: 140,
      cursor: 'pointer',
    },
    stateModifier: {
      height: 50,
      width: 50,
      xAlignment: 20,
      yAlignment: 45,
      opacity: 0,
      cursor: 'pointer',
    },
    label: {
      textWrap: {
        width: 90,
        height: 180,
        text: 'Functional state',
      },
      pointerEvents: 'none',
      fontFamily: FONT_FAMILY,
    },
  },
};

export const toolsOptions: SbpmElementToolsOptions = [
  {
    type: 'remove',
    options: {
      x: 100,
    },
  },
  {
    type: 'connect',
    options: {
      x: 125,
    },
  },
];
