import './styles/style.scss';
import '../node_modules/materialize-css/dist/js/materialize';
import Modeler from '../../lib/modeler';
import { subjectComponent } from './components/subject';
import { messageComponent } from './components/message';

const modeler = Modeler.initialize({
  el: document.querySelector('.sbpmjs'),
  routerName: 'orthogonal'
});

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.collapsible');
  const instance = M.Collapsible.init(element, {
    accordion: false
  });
  instance.open(0);
});

subjectComponent();
messageComponent();

const sst = modeler.sstf.add({
  description: 'Send state',
  position: {
    x: 200,
    y: 100
  }
});

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

const rsf = modeler.rsf.add({
  description: 'Receive state',
  position: {
    x: 400,
    y: 100
  }
});

const fsf = modeler.fsf.add({
  description: 'Function state',
  position: {
    x: 200,
    y: 100
  }
});
