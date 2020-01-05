import * as joint from 'jointjs';
import { ShapeTypes } from './variables';
import { StateOptions } from './types';
import { sendStateDefaults } from './defaults';
import { deleteIcon } from './icons/delete';
import { callMadeIcon } from './icons/call';
import { openInNewIcon } from './icons/openInNew';
import { sendStateIcon } from './icons/sendState';

export const createSendState = (options: StateOptions) => {
  const { description, position, startState, endState } = options;

  const sendState = new joint.shapes.basic.Image({
    ...sendStateDefaults,
    type: ShapeTypes.SEND_STATE
  });

  sendState.position(position.x, position.y);
  sendState.attr('image/xlinkHref', sendStateIcon());
  sendState.attr('text/textWrap/text', description);

  return sendState;
};

export const createElementTools = () => {
  const boundaryTool = new joint.elementTools.Boundary({
    focusOpacity: 1,
    useModelGeometry: true
  });

  const removeButton = new joint.elementTools.Remove({
    rotate: true,
    x: '48.5%',
    y: '-9%',
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': deleteIcon(),
          cursor: 'pointer'
        }
      }
    ]
  });

  const openInNewButton = new joint.elementTools.Button({
    x: '60%',
    y: '-9%',
    action: function(evt) {},
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': openInNewIcon(),
          cursor: 'pointer'
        }
      }
    ]
  });

  const linkButton = new joint.elementTools.Button({
    x: '71.5%',
    y: '-9%',
    action: function(evt) {},
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': callMadeIcon(),
          cursor: 'pointer'
        }
      }
    ]
  });

  const toolsView = new joint.dia.ToolsView({
    name: 'elementTools',
    tools: [boundaryTool, removeButton, openInNewButton, linkButton]
  });

  return toolsView;
};
