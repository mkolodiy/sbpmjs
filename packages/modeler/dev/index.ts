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

const processNetwork = modeler.addElement({
  type: 'ProcessNetwork',
  label: 'Test',
  position: {
    x: 100,
    y: 100,
  },
});

// modeler.canvas.graph.addCell(processNetwork);

document.getElementById('clear-canvas').addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas').addEventListener('click', () => {
  modeler.canvas.reset();
});
