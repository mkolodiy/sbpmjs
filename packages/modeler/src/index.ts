import { shapes, dia } from 'jointjs';
import { elementOptions, tools } from './example-1/element';

class SbpmElement extends shapes.standard.Image {}

class SbpmElementView extends dia.ElementView {
  select() {
    console.log('select');
  }
}

type EventMap = dia.Paper.EventMap & {
  'element:pointerdown': (elementView: SbpmElementView, evt: dia.Event, x: number, y: number) => void;
};

export const test = (el: any) => {
  const graph = new dia.Graph({}, { cellNamespace: shapes });

  const paper = new dia.Paper({
    el,
    model: graph,
    width: 1600,
    height: 1000,
    gridSize: 1,
    cellViewNamespace: shapes,
    elementView: SbpmElementView,
  });

  const image = new SbpmElement(elementOptions);
  image.addTo(graph);
  // image.attr('text/textWrap/text', 'Test');

  const imageView = paper.findViewByModel(image);
  imageView.addTools(tools());

  paper.on<keyof EventMap>('element:pointerdown', (elementView: SbpmElementView) => {
    elementView.select();
    console.log(elementView);
  });
};

export { default } from './modeler';
