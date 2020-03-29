import { GenericOptions } from '../../common/types';
import { blueDotIcon, redDotIcon } from '../../common/icons';

/**
 * Creates joint options for an element.
 *
 * @param options Object with options which should be used for the update of an element.
 */
export const createElementUpdateOptions = (options: GenericOptions) => {
  const { description } = options;
  return {
    'text/textWrap/text': description
  };
};

/**
 * Creates joint options for a state.
 *
 * @param options Object with options which should be used for the update of a state.
 */
export const createStateUpdateOptions = (options: GenericOptions) => {
  const { description, startState, endState } = options;
  let stateModifierUpdateOptions = {};

  if (Boolean(startState) || Boolean(endState)) {
    const stateModifierOptions = getStateModifierOptions(options);
    stateModifierUpdateOptions = {
      'stateModifier/xlink:href': stateModifierOptions['xlink:href'],
      'stateModifier/opacity': stateModifierOptions.opacity
    };
  }

  return {
    ...createElementUpdateOptions(options),
    ...stateModifierUpdateOptions
  };
};

/**
 * Get state modifier options to show if a state is start or end state.
 */
export const getStateModifierOptions = (options: GenericOptions) => {
  const { startState, endState } = options;

  return {
    opacity: Boolean(startState) || Boolean(endState) ? 0.5 : 0,
    'xlink:href': Boolean(startState)
      ? blueDotIcon
      : Boolean(endState)
      ? redDotIcon
      : ''
  };
};
