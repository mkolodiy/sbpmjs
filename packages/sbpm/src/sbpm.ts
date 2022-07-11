import type { SbpmProcess } from '@sbpmjs/shared';
import Main from './components/Main.svelte';
import { loadProcess } from './manager';

type SbpmOptions = {
  container: HTMLElement;
};

export default class Sbpm {
  constructor(options: SbpmOptions) {
    const { container } = options;

    container.style.height = '100%';
    container.style.width = '100%';

    new Main({
      target: container,
    });
  }

  public loadProcess(process: SbpmProcess) {
    loadProcess(process);
  }
}
