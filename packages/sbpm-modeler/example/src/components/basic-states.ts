import {
  getInputValueFromForm,
  getInputCheckedFromForm,
  addSendState,
  addReceiveState,
  addFunctionState
} from '../common';

export const statesComponent = () => {
  const form = document.querySelector('.basic-states-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const sendState = getInputCheckedFromForm(form, 'sendState');
    const receiveState = getInputCheckedFromForm(form, 'receiveState');
    const functionState = getInputCheckedFromForm(form, 'functionState');

    const positionX = getInputValueFromForm(form, 'positionX');
    const positionY = getInputValueFromForm(form, 'positionY');
    const description = getInputValueFromForm(form, 'description');
    const isStartState = getInputCheckedFromForm(form, 'startState');
    const isEndState = getInputCheckedFromForm(form, 'endState');

    if (sendState) {
      addSendState(positionX, positionY, description, isStartState, isEndState);
    } else if (receiveState) {
      addReceiveState(
        positionX,
        positionY,
        description,
        isStartState,
        isEndState
      );
    } else if (functionState) {
      addFunctionState(
        positionX,
        positionY,
        description,
        isStartState,
        isEndState
      );
    }
  });
};
