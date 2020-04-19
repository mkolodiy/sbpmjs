import { GenericOptions, StateUpdateOptions } from '../../common/types';
import { blueDotIcon, redDotIcon } from '../../common/icons';
import { getDescriptionProperty } from './helper';
import { flattenObject } from '../../common/utils';

/**
 * Creates joint options for a state.
 *
 * @param options Update options.
 */
export const createStateUpdateOptions = (
  options: StateUpdateOptions,
  jointOptions: GenericOptions
) => {
  const { description, startState, endState } = options;

  if (startState !== undefined || endState !== undefined) {
    return {
      ...getDescriptionProperty(description),
      ...flattenObject({
        attrs: { stateModifier: jointOptions.attrs.stateModifier }
      })
    };
  }

  return {
    ...getDescriptionProperty(description)
  };
};

/**
 * Get state modifier options to show if a state is start or end state.
 */
export const getStateModifierOptions = (options: GenericOptions) => {
  const { startState, endState } = options;

  return {
    opacity: Boolean(startState) || Boolean(endState) ? 0.5 : 0,
    xlinkHref: Boolean(startState)
      ? blueDotIcon
      : Boolean(endState)
      ? redDotIcon
      : ''
  };
};
