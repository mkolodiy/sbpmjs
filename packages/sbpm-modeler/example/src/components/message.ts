import { addSubject, getInputValueFromForm, addMessage } from '../common';

export const messageComponent = () => {
  const form = document.querySelector('.message-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bidirectional = getInputValueFromForm(form, 'bidirectional');

    const subject1 = addSubject(100, 100, 'Subject 1');
    const subject2 = addSubject(400, 400, 'Subject 2');
    addMessage(subject1, subject2);
  });
};
