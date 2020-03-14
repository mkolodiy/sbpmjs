import { addSubject, getInputCheckedFromForm, addMessage } from '../common';

export const messageComponent = () => {
  const form = document.querySelector('.message-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const isBidirectional = getInputCheckedFromForm(form, 'bidirectional');

    const subject1 = addSubject(100, 100, 'Subject 1', false);
    const subject2 = addSubject(400, 400, 'Subject 2', false);
    addMessage(subject1, subject2, isBidirectional);
  });
};
