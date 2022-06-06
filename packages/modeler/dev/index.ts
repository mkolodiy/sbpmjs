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

const processNetwork1 = modeler.addElement({
  type: 'ProcessNetwork',
  label: 'Test',
  position: {
    x: 100,
    y: 100,
  },
});

const processNetwork2 = modeler.addElement({
  type: 'ProcessNetwork',
  label: 'Test',
  position: {
    x: 500,
    y: 100,
  },
});

document.getElementById('clear-canvas').addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas').addEventListener('click', () => {
  modeler.canvas.reset();
});
