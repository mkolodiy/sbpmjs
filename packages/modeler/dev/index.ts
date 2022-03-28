import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element1 = modeler.factory.addSbpmProcessNetwork({ id: 'test_1', label: 'Process network', position: { x: 100, y: 100 } });

// const element2 = modeler.factory.addSbpmProcessNetwork({ id: 'test_2', label: 'Test test test', position: { x: 400, y: 400 } });
const element3 = modeler.factory.addSbpmProcessNetwork({ id: 'test_3', label: 'Test test test', position: { x: 400, y: 600 } });

const processModel = modeler.factory.addSbpmProcessModel({ id: 'process_model_1', label: 'Process model', position: { x: 400, y: 400 } });
const processModel2 = modeler.factory.addSbpmProcessModel({ id: 'process_model_2', label: 'Process model', position: { x: 600, y: 400 } });

const sbpmPnt = modeler.factory.addSbpmProcessNetworkTransition({
  source: element1,
  target: processModel,
});

// setTimeout(() => {
//   sbpmPnt.update({ target: processModel2 });
// }, 4000);

// setTimeout(() => {
//   modeler.factory.updateElement(element, { label: 'Updated 2' }, { position: { x: 200, y: 600 } });
// }, 8000);

// document.getElementById('clear-canvas').addEventListener('click', () => {
//   modeler.canvas.clear();
// });

// document.getElementById('reset-canvas').addEventListener('click', () => {
//   modeler.canvas.reset();
// });

// console.log(modeler.canvas.getElements());
// console.log(modeler.canvas.getLinks());
