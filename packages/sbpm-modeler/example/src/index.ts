import './styles/style.scss';
import '../node_modules/materialize-css/dist/js/materialize';
import Modeler, { ModelerOptions } from '../../lib/modeler';
import { subjectComponent } from './components/subject';
import { messageComponent } from './components/message';
import { statesComponent } from './components/basic-states';

const modelerOptions: ModelerOptions = {
  container: document.querySelector('.sbpmjs')
};

const modeler = new Modeler(modelerOptions);

export default modeler;

const { elementCreator, linkCreator, canvas } = modeler;

document.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('.collapsible');
  const instance = M.Collapsible.init(element, {
    accordion: false
  });
});

document
  .querySelector('.clear-canvas')
  .addEventListener('click', () => canvas.clear());

document
  .querySelector('.set-canvas-to-origin')
  .addEventListener('click', () => canvas.setToOrigin());

document
  .querySelector('.format-update-options')
  .addEventListener('click', () => {
    const updateOptionsTextarea = document.querySelector(
      '.update-options'
    ) as HTMLTextAreaElement;
    const unformattedObject = updateOptionsTextarea.value;
    console.log(unformattedObject);
    const parsedObject = JSON.parse(unformattedObject);
    const prettifiedObject = JSON.stringify(parsedObject, undefined, 4);
    updateOptionsTextarea.value = prettifiedObject;
  });

document.querySelector('.update-element').addEventListener('click', () => {
  const updateOptionsTextarea = document.querySelector(
    '.update-options'
  ) as HTMLTextAreaElement;
  const updateOptions = JSON.parse(updateOptionsTextarea.value);
  console.log(updateOptions);
  elementCreator.updateCurrentlySelectedElement(updateOptions);
});

document.querySelector('.update-link').addEventListener('click', () => {
  const updateOptionsTextarea = document.querySelector(
    '.update-options'
  ) as HTMLTextAreaElement;
  const updateOptions = JSON.parse(updateOptionsTextarea.value);
  console.log(updateOptions);
  linkCreator.updateCurrentlySelectedLink(updateOptions);
});

canvas.onElementSelected(cellView => {
  console.log(cellView);
});

canvas.onLinkSelected(cellView => {
  console.log(cellView);
});

subjectComponent();
messageComponent();
statesComponent();

demo1();
demo2();
demo3();
demo4();
demo5();
demo6();

function demo1() {
  const humanSubject = elementCreator.addStandardSubject({
    description: 'Human standard subject',
    position: {
      x: 100,
      y: 100
    }
  });
  const machineSubject = elementCreator.addStandardSubject({
    description: 'Machine standard subject',
    position: {
      x: 800,
      y: 100
    },
    isMachine: true
  });
  linkCreator.addMessageTransition({
    source: humanSubject,
    target: machineSubject
  });
}

function demo2() {
  const humanSubject = elementCreator.addStandardSubject({
    description: 'Human standard subject',
    position: {
      x: 100,
      y: 300
    }
  });
  const machineSubject = elementCreator.addStandardSubject({
    description: 'Machine standard subject',
    position: {
      x: 800,
      y: 300
    },
    isMachine: true
  });
  linkCreator.addMessageTransition({
    source: machineSubject,
    target: humanSubject,
    isBidirectional: true
  });
}

function demo3() {
  const sendState = elementCreator.addSendState({
    description: 'Send state',
    position: {
      x: 100,
      y: 500
    }
  });
  const receiveState = elementCreator.addReceiveState({
    description: 'Receive state',
    position: {
      x: 800,
      y: 500
    }
  });
  linkCreator.addSendStateTransition({
    source: sendState,
    target: receiveState,
    receiver: 'Subject A',
    message: 'Message A'
  });
}

function demo4() {
  const receiveState = elementCreator.addReceiveState({
    description: 'Receive state',
    position: {
      x: 100,
      y: 700
    }
  });
  const functionState = elementCreator.addFunctionState({
    description: 'Function state',
    position: {
      x: 800,
      y: 680
    }
  });
  linkCreator.addReceiveStateTransition({
    source: receiveState,
    target: functionState,
    sender: 'Subject A',
    message: 'Message A'
  });
}

function demo5() {
  const functionState = elementCreator.addFunctionState({
    description: 'Function state',
    position: {
      x: 100,
      y: 880
    }
  });
  const sendState = elementCreator.addSendState({
    description: 'Receive state',
    position: {
      x: 800,
      y: 900
    }
  });
  linkCreator.addFunctionStateTransition({
    source: functionState,
    target: sendState,
    action: 'Action'
  });
}

function demo6() {
  const sendState = elementCreator.addSendState({
    description: 'Send state',
    position: {
      x: 100,
      y: 1100
    },
    isStartState: true
  });
  const receiveState = elementCreator.addReceiveState({
    description: 'Receive state',
    position: {
      x: 800,
      y: 1100
    },
    isEndState: true
  });
  linkCreator.addSendStateTransition({
    source: sendState,
    target: receiveState,
    receiver: 'Subject A',
    message: 'Message A'
  });
}
