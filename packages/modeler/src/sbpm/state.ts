import * as joint from 'jointjs';
import type { SbpmSendStateType, SbpmReceiveStateType, SbpmFunctionStateType, SbpmState as SbpmStateOptions } from '@sbpmjs/shared';
import { blueDotIcon, createJointType, redDotIcon } from '../common';
import type { GetUpdateOptions } from '../common';
import { addActionsToElementToolsOptions, SbpmElement } from '../core';
import type { SbpmElementToolsOptions, SbpmElementAttributes } from '../core';
import type { SbpmModelerOptions } from '../canvas';

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
    const { role = 'none' } = options;

    if (role !== 'none') {
      this.attr('stateModifier/opacity', 0.5);
    } else {
      this.attr('stateModifier/opacity', 0);
    }

    if (role === 'start') {
      this.attr('stateModifier/xlinkHref', blueDotIcon);
    }

    if (role === 'end') {
      this.attr('stateModifier/xlinkHref', redDotIcon);
    }

    super.update(options);
  }

  public getUpdatableOptions(): GetUpdateOptions<SbpmStateOptions> {
    const options = super.getUpdatableOptions() as GetUpdateOptions<SbpmStateOptions>;

    if (this.attr('stateModifier/opacity') === '0') {
      options.role = 'none';
    }

    if (this.attr('stateModifier/xlinkHref') === blueDotIcon) {
      options.role = 'start';
    }

    if (this.attr('stateModifier/xlinkHref') === redDotIcon) {
      options.role = 'end';
    }

    return options;
  }
}

function getStateModifierOptions(options: SbpmStateOptions) {
  const { role = 'none' } = options;

  if (role !== 'none') {
    return {
      xlinkHref: role === 'start' ? blueDotIcon : redDotIcon,
      opacity: '0.5',
    };
  }

  return {
    opacity: '0',
  };
}
