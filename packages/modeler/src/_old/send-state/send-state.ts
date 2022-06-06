import * as joint from 'jointjs';
import { blueDotIcon, GetUpdateOptions, redDotIcon, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmSendStateOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createSendStateOptions(options: SbpmSendStateOptions, modelerOptions: SbpmModelerOptions) {
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
    type: SbpmElementType.SEND_STATE,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmSendStateOptions>;
}

export default class SbpmSendState extends SbpmElement<SbpmSendStateOptions> {
  type: typeof SbpmElementType.SEND_STATE = SbpmElementType.SEND_STATE;

  public update(options: GetUpdateOptions<SbpmSendStateOptions>) {
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

function getStateModifierOptions(options: SbpmSendStateOptions) {
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
