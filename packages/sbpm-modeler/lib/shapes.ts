import * as joint from 'jointjs';
import { ShapeTypes } from './variables';
import { SubjectOptions, StateOptions } from './types';
import { standardSubjectHuman } from './icons/standardSubjectHuman';
import { standardSubjectMachine } from './icons/standardSubjectMachine';
import {
  standardSubjectHumanDefaults,
  standardSubjectMachineDefaults,
  sendStateDefaults
} from './options';
import { deleteIcon } from './icons/delete';
import { callMadeIcon } from './icons/call';
import { openInNewIcon } from './icons/openInNew';
import { sendStateIcon } from './icons/sendState';

export const createOrigin = () => {
  const Origin = joint.shapes.standard.Rectangle.define(
    ShapeTypes.ORIGIN,
    {
      attrs: {
        x: -20,
        y: -20,
        width: 40,
        height: 40,
        verticalLine: {
          xAlignment: 'middle',
          yAlignment: 'middle',
          width: 3,
          height: 40,
          fill: '#000',
          opacity: 0.25,
          pointerEvents: 'none'
        },
        horizontalLine: {
          xAlignment: 'middle',
          yAlignment: 'middle',
          width: 40,
          height: 3,
          fill: '#000',
          opacity: 0.25,
          pointerEvents: 'none'
        },
        text: {
          textVerticalAnchor: 'middle',
          textAnchor: 'middle',
          refX: '50%',
          refY: '50%',
          fill: '#000',
          opacity: 0.25,
          text: '(0,0)',
          pointerEvents: 'none'
        }
      }
    },
    {
      markup: [
        {
          tagName: 'rect',
          selector: 'verticalLine'
        },
        {
          tagName: 'rect',
          selector: 'horizontalLine'
        },
        {
          tagName: 'text',
          selector: 'text'
        }
      ]
    }
  );

  const origin = new Origin();
  origin.resize(40, 40);

  return origin;
};

export const createStandardSubject = (options: SubjectOptions) => {
  const { description, position, machine } = options;
  const defaults = machine
    ? standardSubjectMachineDefaults
    : standardSubjectHumanDefaults;

  const standardSubject = new joint.shapes.basic.Image({
    ...defaults,
    type: ShapeTypes.STANDARD_SUBJECT
  });

  const icon = machine ? standardSubjectMachine() : standardSubjectHuman();
  standardSubject.position(position.x, position.y);
  standardSubject.attr('image/xlinkHref', icon);
  standardSubject.attr('text/textWrap/text', description);

  return standardSubject;
};

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
