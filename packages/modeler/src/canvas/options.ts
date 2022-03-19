import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import SbpmLinkView from '../link-view';
import { getDefaultLink } from '../factory';

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
  elementView,
  linkView,
  defaultLink,
  validateConnection,
};

function elementView(_element: joint.dia.Element) {
  return SbpmElementView;
}

function linkView(_link: joint.dia.Link) {
  return SbpmLinkView;
}

function defaultLink(cellView: joint.dia.CellView) {
  const sbpmElementView = cellView as SbpmElementView;
  const type = sbpmElementView.element.get('type');
  return getDefaultLink(type);
}

function validateConnection(
  cellViewS: joint.dia.CellView,
  _magnetS: any,
  cellViewT: joint.dia.CellView,
  _magnetT: any,
  _end: joint.dia.LinkEnd,
  _linkView: joint.dia.LinkView
) {
  // Prevent link to link connections
  if (cellViewS.model.isLink() || cellViewT.model.isLink()) {
    return false;
  }

  // Prevent source to target connection
  if (cellViewS.model.get('id') === cellViewT.model.get('id')) {
    return false;
  }

  return true;
}
