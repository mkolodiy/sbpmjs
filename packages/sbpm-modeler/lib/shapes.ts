import * as joint from 'jointjs';
import { ShapeTypes } from './variables';
import { SubjectOptions } from './types';
import { standardSubjectHumanIcon } from './icons';

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
    position: {
      x: 0,
      y: 50
    },
    size: {
      width: 80,
      height: 160
    },
    attrs: {
      image: {
        'xlink:href': standardSubjectHumanIcon(),
        width: 80,
        height: 160,
        cursor: 'pointer'
      },
      text: {
        textWrap: {
          text: options.description,
          width: 150
        },
        xAlignment: '-52%',
        yAlignment: -100,
        pointerEvents: 'none',
        fontWeight: 'bold',
        lineHeight: 18
      }
    }
  });

  return standardSubject;
};
