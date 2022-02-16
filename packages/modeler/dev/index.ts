import Modeler, { test } from '../src';

// test(document.getElementById('container'));

const modeler = new Modeler({
  container: document.getElementById('container'),
});

modeler.addSbpmProcessNetwork({ label: 'Test test test' }, { position: { x: 100, y: 100 } });
