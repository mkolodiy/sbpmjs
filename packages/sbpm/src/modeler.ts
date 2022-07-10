import SbpmModeler from '@sbpmjs/modeler';
import { views, getItems } from './store';

export let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      restoreView(String(element.id));
    },
    onOpenLink: (link) => {
      restoreView(String(link.id));
    },
  });
}

export function restoreView(view: string) {
  const ids = views[view];
  const items = getItems(ids);
  modeler.restoreView(items);
}
