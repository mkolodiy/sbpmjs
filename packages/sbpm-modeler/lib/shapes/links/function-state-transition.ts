import {
  LabelBasedLinkToolsOptions,
  LinkOptions,
  LinkCreationOptions
} from '../../common/types';
import { ShapeType } from '../../common/constants';

export const createFunctionStateTransitionOptions = (
  options: LinkOptions
): LinkCreationOptions<LinkOptions> => {
  return {
    jointOptions,
    options,
    iconLabel,
    type: ShapeType.FUNCTION_STATE_TRANSITION,
    labelBasedLinkToolsOptions
  };
};

/**
 * Default options used to create a function state transition.
 */
const jointOptions = {
  attrs: {
    wrapper: {
      pointerEvents: 'none'
    }
  }
};

/**
 * Default options used to create label based link tools.
 */
const labelBasedLinkToolsOptions: LabelBasedLinkToolsOptions = {
  selectionLabelOptions: {
    width: 195,
    height: 75
  },
  removeLabelOptions: {
    xAlignment: 103,
    yAlignment: -40
  },
  removeVerticesLabelOptions: {
    xAlignment: 128,
    yAlignment: -40
  }
};

const iconLabel = {
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  attrs: {
    body: {
      width: 180,
      height: 60,
      strokeWidth: 2,
      stroke: '#b3b3b3ff',
      fill: '#FFFFFF',
      xAlignment: 'middle',
      yAlignment: 'middle',
      cursor: 'pointer'
    },
    text: {
      xAlignment: 'middle',
      yAlignment: 'middle',
      textWrap: {
        text: 'TBD',
        width: 180,
        height: 60
      },
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle'
    }
  }
};
