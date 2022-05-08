import * as joint from 'jointjs';
import { CustomEvent } from '../canvas';
import { autoRenewIcon, deleteIcon } from '../common';
import { icon } from './icon';

export const iconLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    iconLabel: {
      'xlink:href': icon,
      width: 85,
      height: 55,
    },
  },
};

export const selectionLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    selectionLabel: {
      width: 95,
      height: 65,
    },
  },
};

export const removeLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    background: {
      xAlignment: 52.5,
      yAlignment: -35,
    },
    buttonLabel: {
      'xlink:href': deleteIcon,
      event: CustomEvent.LINK_REMOVE,
      xAlignment: 52.5,
      yAlignment: -35,
      title: 'Remove',
    },
  },
};

export const removeVerticesLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    background: {
      xAlignment: 77.5,
      yAlignment: -35,
    },
    buttonLabel: {
      'xlink:href': autoRenewIcon,
      event: CustomEvent.LINK_REMOVE_VERTICES,
      xAlignment: 77.5,
      yAlignment: -35,
      title: 'Remove vertices',
    },
  },
};