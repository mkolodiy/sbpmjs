import Modeler from '../../lib/modeler';

export const getInputValueFromForm = (form: Element, id: string) => {
  return (form.querySelector(`#${id}`) as HTMLInputElement).value;
};

export const getInputCheckedFromForm = (form: Element, id: string) => {
  return (form.querySelector(`#${id}`) as HTMLInputElement).checked;
};

export const addSubject = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  machine: boolean
) => {
  return Modeler.getInstance().addStandardSubject({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    isMachine: machine
  });
};

export const addMessage = (
  source: any,
  target: any,
  isBidirectional?: boolean
) => {
  return Modeler.getInstance().addMessageTransition({
    source,
    target,
    isBidirectional
  });
};

export const addSendState = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  startState: boolean,
  endState: boolean
) => {
  return Modeler.getInstance().addSendState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    startState,
    endState
  });
};

export const addReceiveState = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  startState: boolean,
  endState: boolean
) => {
  return Modeler.getInstance().addReceiveState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    startState,
    endState
  });
};

export const addFunctionState = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  startState: boolean,
  endState: boolean
) => {
  return Modeler.getInstance().addFunctionState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    startState,
    endState
  });
};
