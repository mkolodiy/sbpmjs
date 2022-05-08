import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
  onSelectElement: (element) => {
    console.log('onSelectElement', element);
  },
  onSelectLink: (link) => {
    console.log('onSelectLink', link);
  },
  onDeleteElement: (element) => {
    console.log('onDeleteElement', element);
  },
  onDeleteLink: (link) => {
    console.log('onDeleteLink', link);
  },
  onOpenElement: (element) => {
    console.log('onOpenElement', element);
  },
});

const element1 = modeler.factory.addSbpmProcessNetwork({ id: 'test_1', label: 'Process network', position: { x: 100, y: 100 } });

// const element2 = modeler.factory.addSbpmProcessNetwork({ id: 'test_2', label: 'Test test test', position: { x: 400, y: 400 } });
const element3 = modeler.factory.addSbpmProcessNetwork({ id: 'test_3', label: 'Test test test', position: { x: 400, y: 600 } });

const processModel = modeler.factory.addSbpmProcessModel({ id: 'process_model_1', label: 'Process model', position: { x: 400, y: 400 } });
const processModel2 = modeler.factory.addSbpmProcessModel({
  id: 'process_model_2',
  label: 'Process model',
  position: { x: 600, y: 400 },
  processType: 'multi',
});

const sbpmPnt = modeler.factory.addSbpmProcessTransition({
  source: element1,
  target: processModel,
});

const sub1 = modeler.factory.addSubject({
  id: 'subject-1',
  label: 'Subject 1',
  position: {
    x: 400,
    y: 100,
  },
});

const sub2 = modeler.factory.addSubject({
  id: 'subject-2',
  label: 'Subject 2',
  position: {
    x: 900,
    y: 100,
  },
});

modeler.factory.addSbpmMessageTransition({
  source: sub1,
  target: sub2,
});

// setTimeout(() => {
//   processModel2.update({ processType: 'single' });
// }, 2000);

// setTimeout(() => {
//   processModel2.update({ processType: 'multi' });
// }, 4000);

// setTimeout(() => {
//   modeler.factory.updateElement(element, { label: 'Updated 2' }, { position: { x: 200, y: 600 } });
// }, 8000);

document.getElementById('clear-canvas').addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas').addEventListener('click', () => {
  modeler.canvas.reset();
});

// console.log(modeler.canvas.getElements());
// console.log(modeler.canvas.getLinks());

console.log(modeler.canvas.paper.findViewsInArea({ x: 99, y: 99, height: 200, width: 200 }));
