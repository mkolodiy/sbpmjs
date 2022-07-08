import SbpmModeler from '@sbpmjs/modeler';
import { openView } from './graph';

export let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      openView(String(element.id));
    },
  });
}
