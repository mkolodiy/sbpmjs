import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmMessageTransitionOptions } from './types';
import { iconLabel, selectionLabel, removeLabel, removeVerticesLabel } from './options';
import { createButtonLabel, createIconLabel, createSelectionLabel } from '../link-tools';

export function createMessageTransitionOptions(options?: SbpmMessageTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      jointOptions: undefined,
      toolsOptions: [],
      type: SbpmElementType.MESSAGE_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmMessageTransitionOptions>;
}

export default class SbpmMessageTransition extends SbpmLink<SbpmMessageTransitionOptions> {
  type: typeof SbpmElementType.MESSAGE_TRANSITION = SbpmElementType.MESSAGE_TRANSITION;

  constructor(attributes: SbpmLinkAttributes<SbpmMessageTransitionOptions> | undefined, opt?: joint.dia.Graph.Options | undefined) {
    super(attributes, opt);
    this.appendLabel(createIconLabel(iconLabel));
  }

  public update(options: GetUpdateOptions<SbpmMessageTransitionOptions>) {
    super.update(options);
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
