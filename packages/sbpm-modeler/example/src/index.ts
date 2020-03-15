import './styles/style.scss';
import '../node_modules/materialize-css/dist/js/materialize';
import Modeler from '../../lib/modeler';
import { subjectComponent } from './components/subject';
import { messageComponent } from './components/message';
import { statesComponent } from './components/basic-states';

const modeler = Modeler.create({
  container: document.querySelector('.sbpmjs'),
  routerName: 'orthogonal'
});

modeler;

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.collapsible');
  const instance = M.Collapsible.init(element, {
    accordion: false
  });
  instance.open(0);
});

subjectComponent();
messageComponent();
statesComponent();

// const sst = modeler.sstf.add({
//   description: 'Send state',
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

// const sendState1 = modeler.addSendState({
//   description: 'Send state',
//   position: {
//     x: 200,
//     y: 200
//   }
// });

// const receiveState1 = modeler.addReceiveState({
//   description: 'Receive state',
//   position: {
//     x: 600,
//     y: 200
//   }
// });

// const functionState1 = modeler.addFunctionState({
//   description: 'Receive state',
//   position: {
//     x: 600,
//     y: 600
//   }
// });
