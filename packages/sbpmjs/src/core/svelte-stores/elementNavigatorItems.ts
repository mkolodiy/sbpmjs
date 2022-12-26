import type { SbpmProcessItem } from '@sbpmjs/shared';
import { writable } from 'svelte/store';
import { defaultProcess } from '../common';
import { getItemsByIds } from '../store';
import { getViews } from '../views';

export const elementNavigatorItems = writable<SbpmProcessItem[]>([defaultProcess]);

export function initElementNavigatorItems() {
  const views = getViews();
  const ids = Object.keys(views);
  elementNavigatorItems.update(() => getItemsByIds(ids));
}

export const currentlySelectedNavigatorItem = writable<SbpmProcessItem>(defaultProcess);

export function updateCurrentlySelectedNavigatorItem(item: SbpmProcessItem) {
  currentlySelectedNavigatorItem.update(() => item);
}
