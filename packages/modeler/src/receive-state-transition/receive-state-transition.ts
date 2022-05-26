import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmReceiveStateTransitionOptions } from './types';
import { iconLabel, selectionLabel, removeLabel, removeVerticesLabel, jointOptions } from './options';
import { createButtonLabel, createSelectionLabel } from '../link-tools';

export function createReceiveStateTransitionOptions(options?: SbpmReceiveStateTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      jointOptions: joint.util.cloneDeep(jointOptions),
      toolsOptions: [],
      type: SbpmElementType.RECEIVE_STATE_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmReceiveStateTransitionOptions>;
}

export default class SbpmReceiveStateTransition extends SbpmLink<SbpmReceiveStateTransitionOptions> {
  type: typeof SbpmElementType.RECEIVE_STATE_TRANSITION = SbpmElementType.RECEIVE_STATE_TRANSITION;

  constructor(attributes: SbpmLinkAttributes<SbpmReceiveStateTransitionOptions> | undefined, opt?: joint.dia.Graph.Options | undefined) {
    super(attributes, opt);
    this.appendLabel(getIconLabel(attributes?.initialOptions?.sender, attributes?.initialOptions?.message));
  }

  public update(options: GetUpdateOptions<SbpmReceiveStateTransitionOptions>) {
    const { sender, message, ...restOptions } = options;

    if (sender && message) {
      this.removeLabel(0);
      this.insertLabel(0, getIconLabel(sender, message));
    } else {
      const existingIconLabel = this.label(0);
      this.removeLabel(0);

      if (sender) {
        this.insertLabel(0, getIconLabelSender(existingIconLabel, sender));
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

function getIconLabel(sender = '', message = '') {
  return joint.util.merge(iconLabel, { attrs: { headerText: { textWrap: { text: sender } }, bodyText: { textWrap: { text: message } } } });
}

function getIconLabelSender(existingIconLabel: joint.dia.Link.Label, sender = '') {
  return joint.util.merge(joint.util.cloneDeep(existingIconLabel), { attrs: { headerText: { textWrap: { text: sender } } } });
}

function getIconLabelMessage(existingIconLabel: joint.dia.Link.Label, message = '') {
  return joint.util.merge(joint.util.cloneDeep(existingIconLabel), { attrs: { bodyText: { textWrap: { text: message } } } });
}
