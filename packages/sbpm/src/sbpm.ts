import type { SbpmOptions } from './common/types';
import Main from './Main.svelte';
import { processes } from './stores/processes';

export default class Sbpm {
  constructor(options: SbpmOptions) {
    const { containerIdentifier, initialProcessList } = options;

    if (initialProcessList) {
      processes.init(initialProcessList);
    }

    processes.subscribe((value) => {
      console.log(value);
    });

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
