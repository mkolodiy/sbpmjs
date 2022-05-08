import * as joint from 'jointjs';
import { deleteIcon, touchAppIcon } from '../common';

export const defaultButtonOptions: joint.linkTools.Button.Options = {
  markup: [
    {
      tagName: 'rect',
      attributes: {
        fill: 'white',
        width: '24px',
        height: '24px',
        rx: 1,
        ry: 1,
      },
    },
    {
      tagName: 'image',
      attributes: {
        'xlink:href': touchAppIcon,
        cursor: 'pointer',
      },
    },
    {
      tagName: 'title',
      textContent: 'New button with no action',
    },
  ],
};

export const defaultRemoveOptions: joint.linkTools.Button.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
    {},
    {
      tagName: 'image',
      attributes: {
        'xlink:href': deleteIcon,
      },
    },
    {
      tagName: 'title',
      textContent: 'Remove',
    },
  ],
});

export const defaultIconLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'image',
      selector: 'iconLabel',
    },
  ],
  attrs: {
    iconLabel: {
      cursor: 'pointer',
      xAlignment: 'middle',
      yAlignment: 'middle',
    },
  },
};

export const defaultSelectionLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'selectionLabel',
    },
  ],
  attrs: {
    selectionLabel: {
      cursor: 'pointer',
      xAlignment: 'middle',
      yAlignment: 'middle',
      fill: 'none',
      stroke: '#33334F',
      'stroke-width': 0.5,
      strokeDasharray: '5, 5',
      pointerEvents: 'none',
    },
  },
};

export const defaultButtonLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'background',
    },
    {
      tagName: 'image',
      selector: 'buttonLabel',
    },
  ],
  attrs: {
    background: {
      fill: 'white',
      width: '24px',
      height: '24px',
      rx: 1,
      ry: 1,
    },
    buttonLabel: {
      cursor: 'pointer',
      width: 24,
      height: 24,
      title: 'New button with no action',
    },
  },
};
