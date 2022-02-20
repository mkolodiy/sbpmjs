import * as joint from 'jointjs';
import { getDefaultLink, getElementView } from './utils';

export const paperOptions: joint.dia.Paper.Options = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0,
  },
  interactive: {
    linkMove: true,
  },
  elementView: getElementView,
  defaultLink: getDefaultLink,
};
