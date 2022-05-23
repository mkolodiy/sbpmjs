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

modeler.factory.addSbpmFunctionState({
  label: 'Test',
  position: {
    x: 100,
    y: 100,
  },
});

modeler.factory.addSbpmSendState({
  label: 'Test',
  position: {
    x: 300,
    y: 100,
  },
});

modeler.factory.addSbpmReceiveState({
  label: 'Test',
  position: {
    x: 600,
    y: 100,
  },
});

// const element1 = modeler.factory.addSbpmProcessNetwork({ id: 'test_1', label: 'Process network', position: { x: 100, y: 100 } });

// // const element2 = modeler.factory.addSbpmProcessNetwork({ id: 'test_2', label: 'Test test test', position: { x: 400, y: 400 } });
// const element3 = modeler.factory.addSbpmProcessNetwork({ id: 'test_3', label: 'Test test test', position: { x: 400, y: 600 } });

// const processModel = modeler.factory.addSbpmProcessModel({ id: 'process_model_1', label: 'Process model', position: { x: 400, y: 400 } });
// const processModel2 = modeler.factory.addSbpmProcessModel({
//   id: 'process_model_2',
//   label: 'Process model',
//   position: { x: 600, y: 400 },
//   processType: 'multi',
// });

// const sbpmPnt = modeler.factory.addSbpmProcessTransition({
//   source: element1,
//   target: processModel,
// });

// const sub1 = modeler.factory.addSubject({
//   id: 'subject-1',
//   label: 'Subject 1',
//   position: {
//     x: 400,
//     y: 100,
//   },
// });

// const sub2 = modeler.factory.addSubject({
//   id: 'subject-2',
//   label: 'Subject 2',
//   position: {
//     x: 900,
//     y: 100,
//   },
//   type: 'machine',
// });

// modeler.factory.addSbpmMessageTransition({
//   source: sub1,
//   target: sub2,
// });

// setTimeout(() => {
//   sub1.update({ type: 'machine' });
//   // modeler.factory.updateElement(sub1, { type: 'machine' });
// }, 2000);

// setTimeout(() => {
//   // sub1.update({ type: 'human' });
//   modeler.factory.updateElement(sub1, { type: 'human' });
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
