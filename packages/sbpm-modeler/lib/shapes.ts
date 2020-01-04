import * as joint from 'jointjs';
import { ShapeTypes } from './variables';
import { SubjectOptions } from './types';
import { standardSubjectHuman } from './icons/standardSubjectHuman';
import { standardSubjectHumanDefaults } from './options';
import { deleteIcon } from './icons/delete';
import { callMadeIcon } from './icons/call';
import { openInNewIcon } from './icons/openInNew';

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
  const standardSubject = new joint.shapes.basic.Image({
    ...standardSubjectHumanDefaults,
    type: ShapeTypes.STANDARD_SUBJECT
  });

  const { description, position } = options;
  standardSubject.position(position.x, position.y);
  standardSubject.attr('image/xlinkHref', standardSubjectHuman());
  standardSubject.attr('text/textWrap/text', description);

  return standardSubject;
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
