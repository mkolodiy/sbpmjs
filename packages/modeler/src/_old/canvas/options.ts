import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import SbpmLinkView from '../link-view';
import { getDefaultLink, isValidConnection } from '../factory';

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
    labelMove: false,
  },
  defaultConnectionPoint: {
    name: 'bbox',
    args: {
      offset: 10,
    },
  },
  elementView,
  linkView,
  defaultLink,
  validateConnection,
};

function elementView() {
  return SbpmElementView;
}

function linkView() {
  return SbpmLinkView;
}

function defaultLink(cellView: joint.dia.CellView) {
  const sbpmElementView = cellView as SbpmElementView;
  const type = sbpmElementView.element.get('type');
  return getDefaultLink(type);
}

function validateConnection(
  cellViewS: joint.dia.CellView,
  _magnetS: unknown,
  cellViewT: joint.dia.CellView,
  _magnetT: unknown,
  _end: joint.dia.LinkEnd,
  linkView: joint.dia.LinkView
) {
  return isValidConnection(cellViewS, cellViewT, linkView);
}
