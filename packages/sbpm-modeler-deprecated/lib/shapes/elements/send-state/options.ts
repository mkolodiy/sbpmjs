import {
  ElementToolsOptions,
  StateOptions,
  StateUpdateOptions
} from '../../../common/types';
import { CustomEvent } from '../../../common/constants';
import { getStateModifierOptions } from '../../common/elements';
import { sendStateIcon } from './icons';

/**
 * Default options used to create element tools for a send state.
 */
export const toolsOptions: ElementToolsOptions = {
  removeButtonOptions: {
    coordinates: {
      x: 155,
      y: -13
    }
  },
  linkButtonOptions: {
    coordinates: {
      x: 180,
      y: -13
    },
    event: CustomEvent.ELEMENT_ADD_SEND_STATE_TRANSITION
  }
};

/**
 * Default options used to create a new send state.
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
    width: 140,
    height: 95
  },
  attrs: {
    image: {
      xlinkHref: sendStateIcon,
      width: 140,
      height: 95,
      cursor: 'pointer'
    },
    stateModifier: {
      height: 50,
      width: 50,
      xAlignment: 45,
      yAlignment: 22.5,
      opacity: 0,
      cursor: 'pointer',
      ...getStateModifierOptions(options)
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: 90,
      yAlignment: -80,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
});
