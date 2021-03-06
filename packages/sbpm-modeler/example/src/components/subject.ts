import {
  addSubject,
  getInputValueFromForm,
  getInputCheckedFromForm
} from '../common';

export const subjectComponent = () => {
  const form = document.querySelector('.subject-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const positionX = getInputValueFromForm(form, 'positionX');
    const positionY = getInputValueFromForm(form, 'positionY');
    const description = getInputValueFromForm(form, 'description');
    const multiple = getInputCheckedFromForm(form, 'multiple');
    addSubject(positionX, positionY, description, multiple);
  });
};
