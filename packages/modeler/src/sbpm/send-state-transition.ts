import * as joint from 'jointjs';
import { autoRenewIcon, createJointType, FONT_FAMILY, deleteIcon, CustomEvent } from '../common';
import type { GetUpdateOptions, SbpmSendStateTransitionType } from '../common';
import { SbpmLink, createSelectionLabel, createButtonLabel } from '../core';
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

export type SbpmSendStateTransitionOptions = SbpmLinkOptions<SbpmSendState, SbpmFunctionState | SbpmReceiveState> & {
  receiver: string;
  message: string;
};

export class SbpmSendStateTransition extends SbpmLink {
  type: SbpmSendStateTransitionType = 'SendStateTransition';

  constructor(
    options: SbpmSendStateTransitionOptions = {} as SbpmSendStateTransitionOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions
  ) {
    const { receiver, message, ...restOptions } = options;

    const attributes = joint.util.merge(jointOptions, {
      toolsOptions: [],
      type: createJointType('sbpm.sbd', 'SendStateTransition'),
      ...restOptions,
    }) as SbpmLinkAttributes;

    super(attributes);

    this.appendLabel(getIconLabel(receiver, message));
  }

  public update(options: GetUpdateOptions<SbpmSendStateTransitionOptions>) {
    const { receiver, message, ...restOptions } = options;

    if (receiver && message) {
      this.removeLabel(0);
      this.insertLabel(0, getIconLabel(receiver, message));
    } else {
      const existingIconLabel = this.label(0);
      this.removeLabel(0);

      if (receiver) {
        this.insertLabel(0, getIconLabelSender(existingIconLabel, receiver));
      }

      if (message) {
        this.insertLabel(0, getIconLabelMessage(existingIconLabel, message));
      }
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

function getIconLabel(receiver = '', message = '') {
  return joint.util.merge(iconLabel, { attrs: { headerText: { textWrap: { text: receiver } }, bodyText: { textWrap: { text: message } } } });
}

function getIconLabelSender(existingIconLabel: joint.dia.Link.Label, receiver = '') {
  return joint.util.merge(joint.util.cloneDeep(existingIconLabel), { attrs: { headerText: { textWrap: { text: receiver } } } });
}

function getIconLabelMessage(existingIconLabel: joint.dia.Link.Label, message = '') {
  return joint.util.merge(joint.util.cloneDeep(existingIconLabel), { attrs: { bodyText: { textWrap: { text: message } } } });
}
