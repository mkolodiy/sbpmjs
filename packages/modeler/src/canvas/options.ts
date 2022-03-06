import * as joint from 'jointjs';
import { getDefaultLink, getElementView, getLinkView } from './utils';

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
  defaultConnectionPoint: {
    name: 'bbox',
    args: {
      offset: 10,
    },
  },
  elementView: getElementView,
  linkView: getLinkView,
  defaultLink: getDefaultLink,
};
