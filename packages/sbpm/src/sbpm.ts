import Main from './components/Main.svelte';
import { loadProcess } from './store';
import { process } from './dummyData';

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

    loadProcess(process);
  }
}
