import * as joint from 'jointjs';
import { autoRenewIcon, createJointType, FONT_FAMILY, deleteIcon, CustomEvent } from '../common';
import type { GetUpdateOptions, SbpmFunctionStateTransitionType } from '../common';
import { SbpmLink, createIconLabel, createSelectionLabel, createButtonLabel } from '../core';
import type { SbpmLinkAttributes, SbpmLinkOptions } from '../core';
import type { SbpmModelerOptions } from '../canvas';
import { SbpmFunctionState } from './function-state';
import { SbpmSendState } from './send-state';
import { SbpmReceiveState } from './receive-state';

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

export type SbpmFunctionStateTransitionOptions = SbpmLinkOptions<SbpmFunctionState, SbpmSendState | SbpmReceiveState> & {
  label: string;
};

export class SbpmFunctionStateTransition extends SbpmLink {
  type: SbpmFunctionStateTransitionType = 'FunctionStateTransition';

  constructor(
    options: SbpmFunctionStateTransitionOptions = {} as SbpmFunctionStateTransitionOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions
  ) {
    const { label, ...restOptions } = options;

    const attributes = joint.util.merge(jointOptions, {
      toolsOptions: [],
      type: createJointType('sbpm.sbd', 'FunctionStateTransition'),
      ...restOptions,
    }) as SbpmLinkAttributes;

    super(attributes);

    this.appendLabel(createIconLabel(getIconLabel(label)));
  }

  public update(options: GetUpdateOptions<SbpmFunctionStateTransitionOptions>) {
    const { label, ...restOptions } = options;

    if (label) {
      this.removeLabel(0);
      this.insertLabel(0, createIconLabel(getIconLabel(label)));
    }

    super.update(restOptions);
  }

  public select() {
    super.select();
    this.appendLabel(createSelectionLabel(selectionLabel));
    this.appendLabel(createButtonLabel(removeLabel));
    this.appendLabel(createButtonLabel(removeVerticesLabel));
  }

  public deselect() {
    super.deselect();
    this.labels()
      .slice(1)
      .forEach(() => this.removeLabel(-1));
  }
}

function getIconLabel(label = '') {
  return joint.util.merge(iconLabel, { attrs: { text: { textWrap: { text: label } } } });
}
