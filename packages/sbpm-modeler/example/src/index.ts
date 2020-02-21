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
