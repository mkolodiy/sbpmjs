import * as joint from 'jointjs';
import { CustomEvent } from '../canvas';
import { autoRenewIcon, deleteIcon, FONT_FAMILY } from '../common';

export const jointOptions: joint.shapes.standard.ImageAttributes = {
  attrs: {
    wrapper: {
      pointerEvents: 'none',
    },
  },
};

export const iconLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  attrs: {
    body: {
      width: 180,
      height: 60,
      strokeWidth: 2,
      stroke: '#b3b3b3ff',
      fill: '#FFFFFF',
      xAlignment: 'middle',
      yAlignment: 'middle',
      cursor: 'pointer',
    },
    text: {
      xAlignment: 'middle',
      yAlignment: 'middle',
      textWrap: {
        text: 'Function state transition',
        width: 180,
        height: 60,
      },
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle',
      fontFamily: FONT_FAMILY,
      fontSize: 14,
    },
  },
};

export const selectionLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    selectionLabel: {
      width: 195,
      height: 75,
    },
  },
};

export const removeLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    background: {
      xAlignment: 103,
      yAlignment: -40,
    },
    buttonLabel: {
      'xlink:href': deleteIcon,
      event: CustomEvent.LINK_REMOVE,
      xAlignment: 103,
      yAlignment: -40,
      title: 'Remove',
    },
  },
};

export const removeVerticesLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    background: {
      xAlignment: 128,
      yAlignment: -40,
    },
    buttonLabel: {
      'xlink:href': autoRenewIcon,
      event: CustomEvent.LINK_REMOVE_VERTICES,
      xAlignment: 128,
      yAlignment: -40,
      title: 'Remove vertices',
    },
  },
};
