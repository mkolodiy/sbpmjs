import * as joint from 'jointjs';
import { deleteIcon, touchAppIcon } from '../common';

export const defaultButtonOptions: joint.linkTools.Button.Options = {
  markup: [
    {
      tagName: 'rect',
      attributes: {
        fill: 'white',
        width: '24px',
        height: '24px',
        rx: 1,
        ry: 1,
      },
    },
    {
      tagName: 'image',
      attributes: {
        'xlink:href': touchAppIcon,
        cursor: 'pointer',
      },
    },
    {
      tagName: 'title',
      textContent: 'New button with no action',
    },
  ],
};

export const defaultRemoveOptions: joint.linkTools.Button.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
    {},
    {
      tagName: 'image',
      attributes: {
        'xlink:href': deleteIcon,
      },
    },
    {
      tagName: 'title',
      textContent: 'Remove',
    },
  ],
});
