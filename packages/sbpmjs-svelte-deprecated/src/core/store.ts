import type { SbpmProcessItem, SbpmType } from '@sbpmjs/shared';

const store: Map<string, SbpmProcessItem> = new Map();

export function getItemById(id: string) {
  const item = store.get(id);
  if (item) {
    return item;
  }
  throw new Error('Could not get item from store.');
}

export function getItems() {
  return store;
}

export function resetItems() {
  store.clear();
}

export function getItemsByIds(ids: string[]) {
  const items: SbpmProcessItem[] = [];
  ids.forEach((id) => {
    items.push(getItemById(id));
  });
  return items;
}

export function addItem(item: SbpmProcessItem) {
  const id = item.properties.id;
  store.set(id, item);
}

export function updateItemById(id: string, optionsContainer: Record<string, unknown>) {
  const item = getItemById(id);

  for (const key of Object.keys(optionsContainer)) {
    const value = optionsContainer[key];
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.properties[key] = optionsContainer[key];
    }
  }
}

export function removeItemById(id: string) {
  store.delete(id);
}

export function removeItemsById(ids: string[]) {
  ids.forEach((id) => removeItemById(id));
}

export function getItemByType(type: SbpmType) {
  const item = [...store.values()].find((item) => item.type === type);
  if (!item) {
    throw new Error('Could not find item.');
  }
  return item;
}
