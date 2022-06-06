import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmSendStateTransitionOptions } from './types';
import { iconLabel, selectionLabel, removeLabel, removeVerticesLabel, jointOptions } from './options';
import { createButtonLabel, createSelectionLabel } from '../link-tools';

export function createSendStateTransitionOptions(options?: SbpmSendStateTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      jointOptions: joint.util.cloneDeep(jointOptions),
      toolsOptions: [],
      type: SbpmElementType.SEND_STATE_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmSendStateTransitionOptions>;
}

export default class SbpmSendStateTransition extends SbpmLink<SbpmSendStateTransitionOptions> {
  type: typeof SbpmElementType.SEND_STATE_TRANSITION = SbpmElementType.SEND_STATE_TRANSITION;

  constructor(attributes: SbpmLinkAttributes<SbpmSendStateTransitionOptions> | undefined, opt?: joint.dia.Graph.Options | undefined) {
    super(attributes, opt);
    this.appendLabel(getIconLabel(attributes?.initialOptions?.receiver, attributes?.initialOptions?.message));
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
