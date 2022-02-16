import * as joint from 'jointjs';
import { FONT_FAMILY, SbpmElementType } from '../../common/constants';
import { icon } from './icon';

const jointOptions: joint.shapes.standard.ImageAttributes = {
  size: {
    width: 130,
    height: 130,
  },
  attrs: {
    image: {
      width: 130,
      height: 130,
      cursor: 'pointer',
      xlinkHref: icon,
    },
    label: {
      textWrap: {
        width: 130,
      },
      text: 'Process network',
      fontFamily: FONT_FAMILY,
      pointerEvents: 'none',
    },
  },
};

const toolsOptions = [
  {
    type: 'removeButton',
    x: 140,
    y: -5,
  },
];

export function getProcessNetworkOptions(options: any, representationalOptions?: any) {
  const { label } = options;
  const { position } = representationalOptions;

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
      },
    },
    position,
    options,
    jointOptions,
    toolsOptions,
    type: SbpmElementType.PROCESS_NETWORK,
  });
}
