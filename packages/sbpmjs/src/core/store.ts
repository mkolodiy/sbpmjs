import type { SbpmProcessItem } from '@sbpmjs/shared';

let store: Record<string, SbpmProcessItem> = {};

export function getItemById(id: string) {
  return store[id];
}

export function getItems() {
  return store;
}

export function resetItems() {
  store = {};
}

export function getItemsByIds(ids: string[]) {
  return ids.map((id) => store[id]);
}

export function addItem(item: SbpmProcessItem) {
  const id = item.properties.id;
  store[id] = item;
}

export function updateItemById(id: string, optionsContainer: Record<string, unknown>) {
  const item = store[id];

  for (const key of Object.keys(optionsContainer)) {
    const value = optionsContainer[key];
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.properties[key] = optionsContainer[key];
    }
  }
}
