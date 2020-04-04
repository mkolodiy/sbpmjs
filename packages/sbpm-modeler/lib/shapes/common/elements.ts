import { GenericOptions, SubjectUpdateOptions } from '../../common/types';
import { blueDotIcon, redDotIcon } from '../../common/icons';
import { getStandardSubjectIcon } from '../elements';

export const createSubjectUpdateOptions = (options: SubjectUpdateOptions) => {
  const { description, isMachine } = options;
  let updateOptions = {};

  if (Boolean(isMachine)) {
    const icon = getStandardSubjectIcon(isMachine);
    updateOptions = {
      'image/xlinkHref': icon
    };
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
 * Creates joint options for a state.
 *
 * @param options Object with options which should be used for the update of a state.
 */
export const createStateUpdateOptions = (options: GenericOptions) => {
  const { description, startState, endState } = options;
  let updateOptions = {};

  if (Boolean(startState) || Boolean(endState)) {
    const stateModifierOptions = getStateModifierOptions(options);
    updateOptions = {
      'stateModifier/xlink:href': stateModifierOptions['xlink:href'],
      'stateModifier/opacity': stateModifierOptions.opacity
    };
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
    'xlink:href': Boolean(startState)
      ? blueDotIcon
      : Boolean(endState)
      ? redDotIcon
      : ''
  };
};
