import SbpmModeler, { constructSbpmView } from '../src';

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

const view = constructSbpmView([
  {
    type: 'ProcessNetwork',
    properties: {
      id: 'processNetwork1',
      label: 'Test',
      position: {
        x: 100,
        y: 80,
      },
    },
  },
  {
    type: 'ProcessModel',
    properties: {
      id: 'processModel1',
      label: 'Test',
      position: {
        x: 700,
        y: 100,
      },
      type: 'multi',
    },
  },
  {
    type: 'ProcessTransition',
    properties: {
      source: 'processNetwork1',
      target: 'processModel1',
    },
  },
]);

// modeler.restoreView(view);

const processNetwork1 = modeler.addElement('ProcessNetwork', {
  id: 'processNetwork1',
  label: 'Test',
  position: {
    x: 100,
    y: 80,
  },
});

// const processModel1 = modeler.addElement('ProcessModel', {
//   id: 'processModel1',
//   label: 'Test',
//   position: {
//     x: 700,
//     y: 100,
//   },
//   type: 'multi',
// });

// const processModel2 = modeler.addElement('ProcessModel', {
//   // id: 'processModel2',
//   label: 'Test',
//   position: {
//     x: 1200,
//     y: 100,
//   },
// });

// const processTransition1 = modeler.addLink('ProcessTransition', {
//   source: { id: 'processNetwork1' },
//   target: { id: 'processModel1' },
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
//   type: 'bidirectional',
// });

// // messageTransition.update({
// //   type: 'unidirectional',
// // });

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

document.getElementById('clear-canvas')?.addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas')?.addEventListener('click', () => {
  modeler.canvas.reset();
});

document.getElementById('restore-view')?.addEventListener('click', () => {
  modeler.restoreView(view);
});
