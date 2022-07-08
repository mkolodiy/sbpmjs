import SbpmModeler from '@sbpmjs/modeler';
import { store, views } from './store';

export let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      openView_v2(String(element.id));
    },
  });
}

export function openView_v2(id: string) {
  modeler.canvas.clear();
  restoreView_v2(id);
}

export function restoreView_v2(view: string) {
  const ids = views[view];

  for (const id of ids) {
    const { type, ...restProps } = store[id];

    if (type.includes('Transition')) {
      modeler.addLink(type, {
        id: restProps.id,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        source: modeler.canvas.graph.getCell(restProps.source),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target: modeler.canvas.graph.getCell(restProps.target),
      });
    } else {
      modeler.addElement(type, restProps);
    }
  }
}
