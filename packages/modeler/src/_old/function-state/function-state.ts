import * as joint from 'jointjs';
import { blueDotIcon, GetUpdateOptions, redDotIcon, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmFunctionStateOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createFunctionStateOptions(options: SbpmFunctionStateOptions, modelerOptions: SbpmModelerOptions) {
  const { label, ...restOptions } = options;

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
      },
      stateModifier: {
        ...getStateModifierOptions(options),
      },
    },
    initialOptions: joint.util.cloneDeep(options),
    jointOptions: joint.util.cloneDeep(jointOptions),
    toolsOptions: addActionsToToolsOptions(toolsOptions, modelerOptions),
    type: SbpmElementType.FUNCTION_STATE,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmFunctionStateOptions>;
}

export default class SbpmFunctionState extends SbpmElement<SbpmFunctionStateOptions> {
  type: typeof SbpmElementType.FUNCTION_STATE = SbpmElementType.FUNCTION_STATE;

  public update(options: GetUpdateOptions<SbpmFunctionStateOptions>) {
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

function getStateModifierOptions(options: SbpmFunctionStateOptions) {
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
