import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmFunctionStateTransitionOptions } from './types';
import { iconLabel, selectionLabel, removeLabel, removeVerticesLabel, jointOptions } from './options';
import { createButtonLabel, createIconLabel, createSelectionLabel } from '../link-tools';

export function createFunctionStateTransitionOptions(options?: SbpmFunctionStateTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      jointOptions: joint.util.cloneDeep(jointOptions),
      toolsOptions: [],
      type: SbpmElementType.FUNCTION_STATE_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmFunctionStateTransitionOptions>;
}

export default class SbpmFunctionStateTransition extends SbpmLink<SbpmFunctionStateTransitionOptions> {
  type: typeof SbpmElementType.FUNCTION_STATE_TRANSITION = SbpmElementType.FUNCTION_STATE_TRANSITION;

  constructor(attributes: SbpmLinkAttributes<SbpmFunctionStateTransitionOptions> | undefined, opt?: joint.dia.Graph.Options | undefined) {
    super(attributes, opt);
    this.appendLabel(createIconLabel(getIconLabel(attributes?.initialOptions.label)));
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
