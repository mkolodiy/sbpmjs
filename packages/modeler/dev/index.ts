import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  container: document.getElementById('container')!,
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
  onOpenLink: (link) => {
    console.log('onOpenLink', link);
  },
});

const processNetwork1 = modeler.addElement('ProcessNetwork', {
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});

const processModel1 = modeler.addElement('ProcessModel', {
  label: 'Test',
  position: {
    x: 700,
    y: 100,
  },
});

const processModel2 = modeler.addElement('ProcessModel', {
  label: 'Test ',
  position: {
    x: 1200,
    y: 100,
  },
});

const processTransition1 = modeler.addLink('ProcessTransition', {
  source: processNetwork1,
  target: processModel1,
});

const processTransition2 = modeler.addLink('ProcessTransition', {
  source: processModel1,
  target: processModel2,
});

const subject1 = modeler.addElement('Subject', {
  label: 'Subject 1',
  position: {
    x: 100,
    y: 300,
  },
});

const subject2 = modeler.addElement('Subject', {
  label: 'Subject 2',
  position: {
    x: 700,
    y: 300,
  },
});

const messageTransition = modeler.addLink('MessageTransition', {
  source: subject1,
  target: subject2,
});

const message = modeler.addElement('Message', {
  label: 'Test',
  position: {
    x: 900,
    y: 300,
  },
});

const sendState = modeler.addElement('SendState', {
  label: 'Send state 1',
  position: {
    x: 100,
    y: 600,
  },
});

const receiveState = modeler.addElement('ReceiveState', {
  label: 'Receive state 1',
  position: {
    x: 700,
    y: 600,
  },
});

const sendStateTransition = modeler.addLink('SendStateTransition', {
  source: sendState,
  target: receiveState,
  subject: 'test',
});

const functionState = modeler.addElement('FunctionState', {
  label: 'Function state 1',
  position: {
    x: 400,
    y: 800,
  },
});

const receiveStateTransition = modeler.addLink('ReceiveStateTransition', {
  source: receiveState,
  target: functionState,
  subject: 'test',
});

const functionStateTransition = modeler.addLink('FunctionStateTransition', {
  source: functionState,
  target: sendState,
  message: 'test',
});

document.getElementById('clear-canvas')?.addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas')?.addEventListener('click', () => {
  modeler.canvas.reset();
});
