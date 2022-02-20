import * as joint from 'jointjs';
import { callMadeIcon, deleteIcon, touchAppIcon } from '../common';

export const defaultBoundaryOptions: joint.elementTools.Boundary.Options = {
  focusOpacity: 1,
  useModelGeometry: true,
  padding: 5,
};

export const defaultButtonOptions: joint.elementTools.Button.Options = {
  y: -5,
  markup: [
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

export const defaultConnectOptions: joint.elementTools.Connect.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
    {
      tagName: 'image',
      attributes: {
        'xlink:href': callMadeIcon,
      },
    },
    {
      tagName: 'title',
      textContent: 'Connect',
    },
  ],
  focusOpacity: 0,
});

export const defaultRemoveOptions: joint.elementTools.Button.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
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
