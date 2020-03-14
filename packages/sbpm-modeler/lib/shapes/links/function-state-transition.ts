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
      tagName: 'rect',
      selector: 'header'
    },
    {
      tagName: 'text',
      selector: 'headerText'
    },
    {
      tagName: 'text',
      selector: 'bodyText'
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
    header: {
      width: 180,
      height: 30,
      strokeWidth: 2,
      stroke: '#b3b3b3ff',
      fill: '#FFFFFF',
      xAlignment: 'middle',
      yAlignment: -30,
      cursor: 'pointer'
    },
    headerText: {
      xAlignment: 'middle',
      yAlignment: -25,
      textWrap: {
        text: 'Subject Test',
        width: 180,
        height: 30
      },
      title: 'Subject Test',
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle'
    },
    bodyText: {
      xAlignment: 'middle',
      yAlignment: 5,
      textWrap: {
        text: 'Message Test',
        width: 180,
        height: 30
      },
      title: 'Message Test',
      cursor: 'pointer',
      textVerticalAnchor: 'middle',
      textAnchor: 'middle'
    }
  }
};
