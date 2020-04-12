import './styles/style.scss';
import '../node_modules/materialize-css/dist/js/materialize';
import Modeler from '../../lib/modeler';
import { subjectComponent } from './components/subject';
import { messageComponent } from './components/message';
import { statesComponent } from './components/basic-states';

const modeler = Modeler.initialize({
  container: document.querySelector('.sbpmjs')
});

const { elementCreator, linkCreator, canvas } = modeler;

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.collapsible');
  const instance = M.Collapsible.init(element, {
    accordion: false
  });
  instance.open(1);
});

document
  .querySelector('.clear-canvas')
  .addEventListener('click', () => canvas.clear());

document
  .querySelector('.set-canvas-to-origin')
  .addEventListener('click', () => canvas.setToOrigin());

canvas.onElementSelected((cellView: joint.dia.CellView) => {
  const { isMachine: isMachineCurrent } = cellView.model.attributes;
  // setTimeout(() => {
  //   const options = {
  //     description: 'Test desc',
  //     isMachine: !isMachineCurrent
  //   };
  //   elementCreator.updateCurrentlySelectedElement(options);
  // }, 1000);
  console.log(cellView);
});

canvas.onLinkSelected((cellView: joint.dia.CellView) => {
  console.log('test');
  setTimeout(() => {
    const options = {
      sender: 'New action',
      message: 'test'
    };
    linkCreator.updateCurrentlySelectedLink(options);
  }, 1000);
});

subjectComponent();
messageComponent();
statesComponent();

// const sub2 = elementCreator.addStandardSubject({
//   description:
//     'Standard subject human Standard subject human Standard subject human',
//   position: {
//     x: 200,
//     y: 500
//   }
// });

// modeler.sstrf.add({
//   source: sst1,
//   target: sub2
// });

// const rsf = modeler.rsf.add({
//   description: 'Receive state',
//   position: {
//     x: 400,
//     y: 100
//   }
// });

// const fsf = modeler.fsf.add({
//   description: 'Function state',
//   position: {
//     x: 200,
//     y: 100
//   }
// });

// const sub2 = modeler.addStandardSubject({
//   description:
//     'Standard subject human Standard subject human Standard subject human',
//   position: {
//     x: 200,
//     y: 500
//   }
// });

const sendState1 = elementCreator.addSendState({
  description: 'Send state',
  position: {
    x: 700,
    y: 200
  }
});

const receiveState1 = elementCreator.addReceiveState({
  description: 'Receive state',
  position: {
    x: 200,
    y: 200
  }
});

const functionState1 = elementCreator.addFunctionState({
  description: 'Receive state',
  position: {
    x: 200,
    y: 600
  }
});

const functionTransition = linkCreator.addFunctionStateTransition({
  source: functionState1,
  target: receiveState1,
  action: 'New Action'
});

linkCreator.addSendStateTransition({
  source: sendState1,
  target: functionState1,
  message: 'Some message',
  receiver: 'Some subject'
});

linkCreator.addReceiveStateTransition({
  source: receiveState1,
  target: sendState1,
  message: 'Some message',
  sender: 'Some subject'
});
