import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element1 = modeler.addSbpmProcessNetwork({ id: 'test_1', label: 'Test test test', position: { x: 100, y: 100 } });
// console.log(element);

// modeler.updateElement(element, { label: 'New label', position: { x: 200, y: 50 } });

const element2 = modeler.addSbpmProcessNetwork({ id: 'test_2', label: 'Test test test', position: { x: 400, y: 400 } });
modeler.addSbpmProcessNetwork({ id: 'test_3', label: 'Test test test', position: { x: 400, y: 600 } });

modeler.addSbpmProcessNetworkTransition({
  source: element1,
  target: element2,
});

// setTimeout(() => {
//   element.update({ label: 'Updated 1', position: { x: 300, y: 300 } });
// }, 4000);

// setTimeout(() => {
//   modeler.updateElement(element, { label: 'Updated 2' }, { position: { x: 200, y: 600 } });
// }, 8000);

document.getElementById('clear-canvas').addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas').addEventListener('click', () => {
  modeler.canvas.reset();
});

console.log(modeler.canvas.getElements());
console.log(modeler.canvas.getLinks());
