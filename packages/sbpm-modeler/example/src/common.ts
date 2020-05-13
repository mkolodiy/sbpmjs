import Modeler from './index';

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
  const { elementCreator } = Modeler;
  return elementCreator.addStandardSubject({
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
  const { linkCreator } = Modeler;
  return linkCreator.addMessageTransition({
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
  const { elementCreator } = Modeler;
  return elementCreator.addSendState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    isStartState: startState,
    isEndState: endState
  });
};

export const addReceiveState = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  startState: boolean,
  endState: boolean
) => {
  const { elementCreator } = Modeler;
  return elementCreator.addReceiveState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    isStartState: startState,
    isEndState: endState
  });
};

export const addFunctionState = (
  positionX: string | number,
  positionY: string | number,
  description: string,
  startState: boolean,
  endState: boolean
) => {
  const { elementCreator } = Modeler;
  return elementCreator.addFunctionState({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    },
    isStartState: startState,
    isEndState: endState
  });
};
