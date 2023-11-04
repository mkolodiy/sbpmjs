import * as joint from 'jointjs';
import type { SbpmReceiveStateTransition as SbpmReceiveStateTransitionOptions } from '../common/types';
import type { SbpmModelerOptions } from '../canvas';
import { SbpmStateTransition } from './state-transition';
import { FONT_FAMILY, CustomEvent } from '../common/constants';
import { deleteIcon, autoRenewIcon } from '../common/icons';
import type { SbpmLinkLabelToolsOptions } from '../core/link-tools';

const jointOptions: joint.shapes.standard.ImageAttributes = {
  attrs: {
    wrapper: {
      pointerEvents: 'none',
    },
  },
};

const iconLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'header',
    },
    {
      tagName: 'text',
      selector: 'headerText',
    },
    {
      tagName: 'text',
      selector: 'bodyText',
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
    header: {
      width: 180,
      height: 30,
      strokeWidth: 2,
      stroke: '#b3b3b3ff',
      fill: '#FFFFFF',
      xAlignment: 'middle',
      yAlignment: -30,
      cursor: 'pointer',
    },
    headerText: {
      xAlignment: 'middle',
      yAlignment: -25,
      textWrap: {
        text: 'Sender',
        width: 180,
        height: 30,
      },
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle',
      fontFamily: FONT_FAMILY,
      fontSize: 14,
    },
    bodyText: {
      xAlignment: 'middle',
      yAlignment: 5,
      textWrap: {
        text: 'Message',
        width: 180,
        height: 30,
      },
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle',
      fontFamily: FONT_FAMILY,
      fontSize: 14,
    },
  },
};

const selectionLabel: joint.dia.Link.Label = {
  markup: [],
  attrs: {
    selectionLabel: {
      width: 195,
      height: 75,
    },
  },
};

const removeLabel: joint.dia.Link.Label = {
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

const removeVerticesLabel: joint.dia.Link.Label = {
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

const labelToolsOptions: SbpmLinkLabelToolsOptions = {
  iconLabel,
  removeLabel,
  removeVerticesLabel,
  selectionLabel,
};

export class SbpmReceiveStateTransition extends SbpmStateTransition<'ReceiveStateTransition'> {
  constructor(
    options: SbpmReceiveStateTransitionOptions = {} as SbpmReceiveStateTransitionOptions,
    modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions,
  ) {
    super('ReceiveStateTransition', jointOptions, [], labelToolsOptions, options, modelerOptions);
  }
}
