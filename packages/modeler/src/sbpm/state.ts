import * as joint from 'jointjs';
import { blueDotIcon, createJointType, redDotIcon } from '../common';
import type { GetUpdateOptions, SbpmSendStateType, SbpmReceiveStateType, SbpmFunctionStateType } from '../common';
import { addActionsToElementToolsOptions, SbpmElement } from '../core';
import type { SbpmElementOptions, SbpmElementToolsOptions, SbpmElementAttributes } from '../core';
import type { SbpmModelerOptions } from '../canvas';

export type SbpmStateOptions = SbpmElementOptions & {
  state?: 'start' | 'end' | 'none';
};

export class SbpmState<
  T extends SbpmSendStateType | SbpmReceiveStateType | SbpmFunctionStateType = SbpmSendStateType | SbpmReceiveStateType | SbpmFunctionStateType
> extends SbpmElement {
  type: T = undefined as unknown as T;

  constructor(
    type: T,
    jointOptions: joint.shapes.standard.ImageAttributes,
    toolsOptions: SbpmElementToolsOptions,
    options: SbpmStateOptions,
    modelerOptions: SbpmModelerOptions
  ) {
    const { label, ...restOptions } = options;

    const attributes = joint.util.merge(joint.util.cloneDeep(jointOptions), {
      attrs: {
        label: {
          textWrap: {
            text: label,
          },
        },
        stateModifier: {
          ...getStateModifierOptions(options),
        },
      },
      toolsOptions: addActionsToElementToolsOptions(joint.util.cloneDeep(toolsOptions), modelerOptions),
      type: createJointType('sbpm.pnd', type),
      ...restOptions,
    }) as SbpmElementAttributes;

    super(attributes);

    this.type = type;
  }

  public update(options: GetUpdateOptions<SbpmStateOptions>) {
    const { state = 'none' } = options;

    if (state !== 'none') {
      this.attr('stateModifier/opacity', 0.5);
    }

    if (state === 'start') {
      this.attr('stateModifier/xlinkHref', blueDotIcon);
    }

    if (state === 'end') {
      this.attr('stateModifier/xlinkHref', redDotIcon);
    }

    super.update(options);
  }
}

function getStateModifierOptions(options: SbpmStateOptions) {
  const { state = 'none' } = options;

  if (state !== 'none') {
    return {
      xlinkHref: state === 'start' ? blueDotIcon : redDotIcon,
      opacity: '0.5',
    };
  }

  return {
    opacity: '0',
  };
}
