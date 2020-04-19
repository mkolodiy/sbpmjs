import {
  StateUpdateOptions,
  ElementToolsOptions,
  StateOptions
} from '../../../common/types';
import { CustomEvent } from '../../../common/constants';
import { getStateModifierOptions } from '../../common/elements';
import { functionStateIcon } from './icons';

/**
 * Default options used to create element tools for a function state.
 */
export const toolsOptions: ElementToolsOptions = {
  removeButtonOptions: {
    coordinates: {
      x: 105,
      y: -13
    }
  },
  linkButtonOptions: {
    coordinates: {
      x: 130,
      y: -13
    },
    event: CustomEvent.ELEMENT_ADD_FUNCTION_STATE_TRANSITION
  }
};

/**
 * Default options used to create a new function state.
 */
export const getJointOptions = (
  options: StateOptions | StateUpdateOptions
) => ({
  markup: [
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'image',
      selector: 'stateModifier'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  size: {
    width: 90,
    height: 140
  },
  attrs: {
    image: {
      xlinkHref: functionStateIcon,
      width: 90,
      height: 140,
      cursor: 'pointer'
    },
    stateModifier: {
      height: 50,
      width: 50,
      xAlignment: 20,
      yAlignment: 45,
      opacity: 0,
      cursor: 'pointer',
      ...getStateModifierOptions(options)
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: 65,
      yAlignment: -80,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
});
