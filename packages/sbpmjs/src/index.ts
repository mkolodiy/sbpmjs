import App from './components/Main.svelte';
import { initDefaults } from './sbpm';

type SbpmOptions = {
  container: HTMLElement;
};

export class Sbpm {
  constructor(options: SbpmOptions) {
    if (!options.container) {
      throw new Error('container is required');
    }

    initDefaults();

    new App({
      target: options.container,
    });
  }
}
