import * as joint from 'jointjs';
import type {
  SbpmSendStateTransitionType,
  SbpmReceiveStateTransitionType,
  SbpmFunctionStateTransitionType,
  SbpmStateTransition as SbpmStateTransitionOptions,
} from '@sbpmjs/shared';
import { createJointType } from '../common';
import type { GetUpdateOptions } from '../common';
import { SbpmLink, createSelectionLabel, createButtonLabel, createIconLabel, handleEndpoint } from '../core';
import type { SbpmLinkAttributes, SbpmLinkToolsOptions, SbpmLinkLabelToolsOptions } from '../core';
import type { SbpmModelerOptions } from '../canvas';

export class SbpmStateTransition<
  T extends SbpmSendStateTransitionType | SbpmReceiveStateTransitionType | SbpmFunctionStateTransitionType =
    | SbpmSendStateTransitionType
    | SbpmReceiveStateTransitionType
    | SbpmFunctionStateTransitionType
> extends SbpmLink {
  type: T = undefined as unknown as T;

  constructor(
    type: T,
    jointOptions: joint.shapes.standard.ImageAttributes,
    toolsOptions: SbpmLinkToolsOptions,
    labelToolsOptions: SbpmLinkLabelToolsOptions,
    options: SbpmStateTransitionOptions = {} as SbpmStateTransitionOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions
  ) {
    const { source, target, subject, message, ...restOptions } = options;

    const attributes = joint.util.merge(joint.util.cloneDeep(jointOptions), {
      toolsOptions: joint.util.cloneDeep(toolsOptions),
      labelToolsOptions: joint.util.cloneDeep(labelToolsOptions),
      type: createJointType('sbpm.sbd', type),
      source: handleEndpoint(source),
      target: handleEndpoint(target),
      ...restOptions,
    }) as SbpmLinkAttributes;

    super(attributes);

    this.type = type;

    this.appendLabel(createIconLabel(getIconLabel(this.labelToolsOptions.iconLabel, subject, message)));
  }

  public update(options: GetUpdateOptions<SbpmStateTransitionOptions>) {
    const { subject, message, ...restOptions } = options;

    const updatedIconLabel = getIconLabel(this.label(0), subject, message);
    this.removeLabel(0);
    this.insertLabel(0, updatedIconLabel);
    super.update(restOptions);
  }

  public select() {
    super.select();
    this.appendLabel(createSelectionLabel(this.labelToolsOptions.selectionLabel));
    this.appendLabel(createButtonLabel(this.labelToolsOptions.removeLabel));
    this.appendLabel(createButtonLabel(this.labelToolsOptions.removeVerticesLabel));
  }

  public deselect() {
    super.deselect();
    this.labels()
      .slice(1)
      .forEach(() => this.removeLabel(-1));
  }

  public getUpdatableOptions(): GetUpdateOptions<SbpmStateTransitionOptions> {
    const options: GetUpdateOptions<SbpmStateTransitionOptions> = super.getUpdatableOptions();

    options.message = this.label(0).attrs?.bodyText?.textWrap?.text;
    options.subject = this.label(0).attrs?.headerText?.textWrap?.text;

    return options;
  }
}

function getIconLabel(iconLabel: joint.dia.Link.Label, subject: string | undefined, message: string | undefined) {
  let updatedIconLabel = iconLabel;

  if (message) {
    updatedIconLabel = updateLabelText(updatedIconLabel, 'bodyText', message);
  }

  if (subject) {
    updatedIconLabel = updateLabelText(updatedIconLabel, 'headerText', subject);
  }

  return updatedIconLabel;
}

function updateLabelText(iconLabel: joint.dia.Link.Label, key: string, text: string) {
  return joint.util.merge(iconLabel, { attrs: { [key]: { textWrap: { text: text } } } });
}
