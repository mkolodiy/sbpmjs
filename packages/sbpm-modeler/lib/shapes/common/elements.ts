import { GenericOptions, SubjectUpdateOptions } from '../../common/types';
import { blueDotIcon, redDotIcon } from '../../common/icons';

/**
 *  Creates joint options for a subject.
 *
 * @param options Update options.
 */
export const createSubjectUpdateOptions = (options: SubjectUpdateOptions) => {
  const { description } = options;
  let updateOptions = {};

  if (description) {
    updateOptions = {
      'text/textWrap/text': description
    };
  }

  return updateOptions;
};

/**
 * Creates joint options for a state.
 *
 * @param options Update options.
 */
export const createStateUpdateOptions = (options: GenericOptions) => {
  const { description, startState, endState } = options;
  let updateOptions = {};

  if (startState !== undefined || endState !== undefined) {
    if (Boolean(startState) || Boolean(endState)) {
      const stateModifierOptions = getStateModifierOptions(options);
      updateOptions = {
        'stateModifier/xlinkHref': stateModifierOptions.xlinkHref,
        'stateModifier/opacity': stateModifierOptions.opacity
      };
    } else {
      updateOptions = {
        'stateModifier/xlinkHref': '',
        'stateModifier/opacity': 0
      };
    }
  }

  if (description) {
    updateOptions = {
      ...updateOptions,
      'text/textWrap/text': description
    };
  }

  return updateOptions;
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
