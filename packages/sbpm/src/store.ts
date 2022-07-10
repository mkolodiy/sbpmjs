import type { SbpmProcessItem, SbpmShapeType, SbpmProcess } from '@sbpmjs/shared';

export const store: Record<string, SbpmProcessItem> = {};

export const views: Record<string, string[]> = {
  defaultView: [],
};

export function loadProcess(process: SbpmProcess) {
  process.forEach((item) => {
    const type = item.type;
    const id = item.properties.id;

    store[id] = item;

    if (isDefaultViewType(type)) {
      views.defaultView = [...views.defaultView, id];
    }

    if ('contains' in item.properties) {
      views[id] = item.properties?.contains ?? [];
    }
  });
}

export function getItems(ids: string[]) {
  return ids.map((id) => store[id]);
}

function isDefaultViewType(type: SbpmShapeType) {
  return type === 'ProcessNetwork' || type === 'ProcessModel' || type === 'ProcessTransition';
}
