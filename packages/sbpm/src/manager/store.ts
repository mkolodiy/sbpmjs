import type { SbpmProcessItem, SbpmShapeType, SbpmProcess } from '@sbpmjs/shared';
import { setView } from './core';

const store: Record<string, SbpmProcessItem> = {};

export function loadProcess(process: SbpmProcess) {
  process.forEach((item) => {
    const type = item.type;
    const id = item.properties.id;

    store[id] = item;

    if (isDefaultViewType(type)) {
      setView('defaultView', [id]);
    }

    if ('contains' in item.properties) {
      setView(id, item.properties?.contains ?? []);
    }
  });
}

export function getItems(ids: string[]) {
  return ids.map((id) => store[id]);
}

function isDefaultViewType(type: SbpmShapeType) {
  return type === 'ProcessNetwork' || type === 'ProcessModel' || type === 'ProcessTransition';
}
