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
    width: 140,
    height: 95,
  },
  attrs: {
    image: {
      xlinkHref: icon,
      width: 140,
      height: 95,
      cursor: 'pointer',
    },
    stateModifier: {
      height: 50,
      width: 50,
      xAlignment: 45,
      yAlignment: 22.5,
      opacity: 0,
      cursor: 'pointer',
    },
    label: {
      textWrap: {
        width: 150,
        height: 180,
        text: 'Send state',
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
      x: 150,
    },
  },
  {
    type: 'connect',
    options: {
      x: 175,
    },
  },
];
