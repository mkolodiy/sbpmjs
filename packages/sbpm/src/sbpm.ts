import Main from './Main.svelte';

export default class Sbpm {
  constructor(containerIdentifier: string) {
    const containerElement = getContainerElement(containerIdentifier);
    new Main({
      target: containerElement,
    });
  }
}

function getContainerElement(containerIdentifier: string) {
  if (!containerIdentifier) {
    throw Error('Container identifier not defined. Please provide a valid container idenfier.');
  }

  const containerElement = document.getElementById(containerIdentifier);

  if (!containerElement) {
    throw Error('Container element not found. Please provide a valid container idenfier.');
  }

  return containerElement;
}
