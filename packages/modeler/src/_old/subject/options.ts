/* eslint-disable prettier/prettier */
import * as joint from 'jointjs';
import { FONT_FAMILY, openInNew } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';
import { humanSubjectIcon, machineSubjectIcon } from './icon';

export const humanTypeJointOptions: joint.shapes.standard.ImageAttributes = {
  size: {
    width: 85,
    height: 140,
  },
  attrs: {
    image: {
      width: 85,
      height: 140,
      cursor: 'pointer',
      xlinkHref: humanSubjectIcon,
    },
    label: {
      textWrap: {
        width: 85,
        height: 180,
        text: 'Subject',
      },
      fontFamily: FONT_FAMILY,
      pointerEvents: 'none',
    },
  },
};

export const machineTypeJointOptions: joint.shapes.standard.ImageAttributes = joint.util.merge(joint.util.cloneDeep(humanTypeJointOptions), {
  size: {
    width: 105,
    height: 140,
  },
  attrs: {
    image: {
      width: 105,
      height: 140,
      xlinkHref: machineSubjectIcon,
    },
    label: {
      textWrap: {
        width: 105,
      },
    },
  },
});

export const humanToolsOptions: SbpmElementToolsOptions = [
  {
    type: 'remove',
    options: {
      x: 95,
    },
  },
  {
    type: 'connect',
    options: {
      x: 119,
    },
  },
  {
    type: 'open',
    options: {
      x: 143,
      markup: [
        {
          tagName: 'rect',
        },
        {
          tagName: 'image',
          attributes: {
            'xlink:href': openInNew,
          },
        },
        {
          tagName: 'title',
          textContent: 'Open',
        },
      ],
    },
  },
];

export const machineToolsOptions: SbpmElementToolsOptions = joint.util.merge(joint.util.cloneDeep(humanToolsOptions), [
  {
    type: 'remove',
    options: {
      x: 115,
    },
  },
  {
    type: 'connect',
    options: {
      x: 139,
    },
  },
  {
    type: 'open',
    options: {
      x: 163,
    },
  },
]) as SbpmElementToolsOptions;
