import { CustomEvent } from '../../../common/constants';
import { ElementToolsOptions } from '../../../common/types';
import { humanSubjectIcon, machineSubjectIcon } from './icons';

/**
 * Default options used to create element tools for a standard subject with human icon.
 */
export const humanSubjectToolsOptions: ElementToolsOptions = {
  removeButtonOptions: {
    coordinates: {
      x: 105,
      y: -13
    }
  },
  openInNewButtonOptions: {
    coordinates: {
      x: 130,
      y: -13
    }
  },
  linkButtonOptions: {
    coordinates: {
      x: 155,
      y: -13
    },
    event: CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION
  }
};

/**
 * Default options used to create a new standard subject with human icon.
 */
export const humanSubjectJointOptions = {
  size: {
    width: 90,
    height: 140
  },
  attrs: {
    image: {
      width: 90,
      height: 140,
      cursor: 'pointer',
      xlinkHref: humanSubjectIcon()
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
};

/**
 * Options used to create element tools for a standard subject with machine icon.
 */
export const machineSubjectToolsOptions: ElementToolsOptions = {
  removeButtonOptions: {
    coordinates: {
      x: 125,
      y: -13
    }
  },
  openInNewButtonOptions: {
    coordinates: {
      x: 150,
      y: -13
    }
  },
  linkButtonOptions: {
    coordinates: {
      x: 175,
      y: -13
    },
    event: CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION
  }
};

/**
 * Default options used to create a new standard subject with machine icon.
 */
export const machineSubjectJointOptions = {
  size: {
    width: 110,
    height: 140
  },
  attrs: {
    image: {
      width: 110,
      height: 140,
      cursor: 'pointer',
      xlinkHref: machineSubjectIcon()
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: 75,
      yAlignment: -80,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
};
