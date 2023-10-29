import App from './App.svelte';

type SbpmOptions = {
  container: HTMLElement;
};

export class Sbpm {
  constructor(options: SbpmOptions) {
    if (!options.container) {
      throw new Error('container is required');
    }

    new App({
      target: options.container,
    });
  }
}
