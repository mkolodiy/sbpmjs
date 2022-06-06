import * as joint from 'jointjs';
import { blueDotIcon, GetUpdateOptions, redDotIcon, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpReceiveStateOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createReceiveStateOptions(options: SbpReceiveStateOptions, modelerOptions: SbpmModelerOptions) {
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
    type: SbpmElementType.RECEIVE_STATE,
    ...restOptions,
  }) as SbpmElementAttributes<SbpReceiveStateOptions>;
}

export default class SbpmReceiveState extends SbpmElement<SbpReceiveStateOptions> {
  type: typeof SbpmElementType.RECEIVE_STATE = SbpmElementType.RECEIVE_STATE;

  public update(options: GetUpdateOptions<SbpReceiveStateOptions>) {
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

function getStateModifierOptions(options: SbpReceiveStateOptions) {
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
