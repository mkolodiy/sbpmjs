import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import SbpmLink from '../link';
import SbpmLinkView from '../link-view';

export function getElementView(_element: joint.dia.Element) {
  return SbpmElementView;
}

export function getLinkView(_link: joint.dia.Link) {
  return SbpmLinkView;
}

export function getDefaultLink(_cellView: joint.dia.CellView, _magnet: any) {
  return new SbpmLink();
}
