import SbpmModeler, {
  SbpmModelerOptions,
  SbpmProcessNetworkOptions,
  SbpmProcessModelOptions,
  SbpmProcessTransitionOptions,
  SbpmSubjectOptions,
  SbpmMessageOptions,
  SbpmMessageTransitionOptions,
  SbpmSendStateOptions,
  SbpmSendStateTransitionOptions,
  SbpmReceiveStateOptions,
  SbpmReceiveStateTransitionOptions,
  SbpmFunctionStateOptions,
  SbpmFunctionStateTransitionOptions,
} from '../src';

// Create a new instance of the SbpmModeler
const modeler = new SbpmModeler({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  container: document.getElementById('container')!,
});

// Create a new element, e.g. process network
const processNetwork = modeler.addElement('ProcessNetwork', {
  label: 'Test process network',
  position: {
    x: 100,
    y: 80,
  },
});

// Create a new element, e.g. process model
const processModel = modeler.addElement('ProcessModel', {
  label: 'Test process model',
  position: {
    x: 700,
    y: 100,
  },
});

// Create a new link, e.g. process transition between process network and process model
const processTransition = modeler.addLink('ProcessTransition', {
  source: processNetwork,
  target: processModel,
});

// const modeler = new SbpmModeler({
//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   container: document.getElementById('container')!,
//   onSelectElement: (element) => {
//     console.log('onSelectElement', element);
//   },
//   onSelectLink: (link) => {
//     console.log('onSelectLink', link);
//   },
//   onDeleteElement: (element) => {
//     console.log('onDeleteElement', element);
//   },
//   onDeleteLink: (link) => {
//     console.log('onDeleteLink', link);
//   },
//   onOpenElement: (element) => {
//     console.log('onOpenElement', element);
//   },
//   onOpenLink: (link) => {
//     console.log('onOpenLink', link);
//   },
// });

// // modeler.canvas.

// const processNetwork1 = modeler.addElement('ProcessNetwork', {
//   label: 'Test',
//   position: {
//     x: 100,
//     y: 80,
//   },
// });

// const processModel1 = modeler.addElement('ProcessModel', {
//   label: 'Test',
//   position: {
//     x: 700,
//     y: 100,
//   },
//   type: 'multi',
// });

// const processModel2 = modeler.addElement('ProcessModel', {
//   label: 'Test ',
//   position: {
//     x: 1200,
//     y: 100,
//   },
// });

// const processTransition1 = modeler.addLink('ProcessTransition', {
//   source: processNetwork1,
//   target: processModel1,
// });

// const processTransition2 = modeler.addLink('ProcessTransition', {
//   source: processModel1,
//   target: processModel2,
// });

// const subject1 = modeler.addElement('Subject', {
//   label: 'Subject 1',
//   position: {
//     x: 100,
//     y: 300,
//   },
// });

// const subject2 = modeler.addElement('Subject', {
//   label: 'Subject 2',
//   position: {
//     x: 700,
//     y: 300,
//   },
//   type: 'machine',
// });

// const messageTransition = modeler.addLink('MessageTransition', {
//   source: subject1,
//   target: subject2,
// });

// const message = modeler.addElement('Message', {
//   label: 'Test',
//   position: {
//     x: 900,
//     y: 300,
//   },
// });

// const sendState = modeler.addElement('SendState', {
//   label: 'Send state 1',
//   position: {
//     x: 100,
//     y: 600,
//   },
//   type: 'start',
// });

// const receiveState = modeler.addElement('ReceiveState', {
//   label: 'Receive state 1',
//   position: {
//     x: 700,
//     y: 600,
//   },
// });

// const sendStateTransition = modeler.addLink('SendStateTransition', {
//   source: sendState,
//   target: receiveState,
//   subject: 'test',
// });

// const functionState = modeler.addElement('FunctionState', {
//   label: 'Function state 1',
//   position: {
//     x: 400,
//     y: 800,
//   },
//   type: 'end',
// });

// const receiveStateTransition = modeler.addLink('ReceiveStateTransition', {
//   source: receiveState,
//   target: functionState,
//   subject: 'test',
// });

// const functionStateTransition = modeler.addLink('FunctionStateTransition', {
//   source: functionState,
//   target: sendState,
//   message: 'test',
// });

// document.getElementById('clear-canvas')?.addEventListener('click', () => {
//   modeler.canvas.clear();
// });

// document.getElementById('reset-canvas')?.addEventListener('click', () => {
//   modeler.canvas.reset();
// });
