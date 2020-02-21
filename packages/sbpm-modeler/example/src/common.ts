import Modeler from '../../lib/modeler';

export const getInputValueFromForm = (form: Element, id: string) => {
  return (form.querySelector(`#${id}`) as HTMLInputElement).value;
};

export const addSubject = (
  positionX: string | number,
  positionY: string | number,
  description: string
) => {
  return Modeler.getInstance().addStandardSubject({
    description,
    position: {
      x: Number(positionX),
      y: Number(positionY)
    }
  });
};

export const addMessage = (source: any, target: any) => {
  return Modeler.getInstance().mf.add({
    source,
    target
  });
};
