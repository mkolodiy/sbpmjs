import * as joint from 'jointjs';
import type { SbpmFunctionStateTransition as SbpmFunctionStateTransitionOptions } from '../common/types';
import type { SbpmModelerOptions } from '../canvas';
import { SbpmStateTransition } from './state-transition';
import { FONT_FAMILY, CustomEvent } from '../common/constants';
import { deleteIcon, autoRenewIcon } from '../common/icons';
import { SbpmLinkLabelToolsOptions } from '../core/link-tools';

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
    bodyText: {
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

export class SbpmFunctionStateTransition extends SbpmStateTransition<'FunctionStateTransition'> {
  constructor(
    options: SbpmFunctionStateTransitionOptions = {} as SbpmFunctionStateTransitionOptions,
    modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions,
  ) {
    // TODO: Fix typings
    const tmpOptions = { ...options, subject: '' };
    super('FunctionStateTransition', jointOptions, [], labelToolsOptions, tmpOptions, modelerOptions);
  }
}
