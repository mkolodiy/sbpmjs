import * as joint from 'jointjs';
import SbpmElementView from '../element-view';

export function getElementView(_element: joint.dia.Element) {
  return SbpmElementView;
}

export function getDefaultLink(cellView: joint.dia.CellView, magnet: any) {
  console.log(cellView);
  console.log(magnet);
  return new joint.shapes.standard.Link();
}
