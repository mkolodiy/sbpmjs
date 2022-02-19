import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  container: document.getElementById('container'),
});

const element = modeler.addSbpmProcessNetwork({ label: 'Test test test' }, { position: { x: 100, y: 100 } });

modeler.addSbpmProcessNetwork({ label: 'Test test test' }, { position: { x: 400, y: 400 } });
modeler.addSbpmProcessNetwork({ label: 'Test test test' }, { position: { x: 400, y: 600 } });

// setTimeout(() => {
//   element.update({ label: 'Updated 1' }, { position: { x: 300, y: 300 } });
// }, 4000);

// setTimeout(() => {
//   modeler.updateElement(element, { label: 'Updated 2' }, { position: { x: 200, y: 600 } });
// }, 8000);