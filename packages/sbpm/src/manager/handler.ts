import type { SbpmElementType, Coordinates, SbpmProcessItem } from '@sbpmjs/shared';
import { get } from 'svelte/store';
import {
  addSbpmElement,
  currentlySelectedSbpmShape,
  reset,
  clear,
  restoreView,
  updateActivePaletteItems,
  getPreviousViewBreadcrumb,
  addViewBreadcrumb,
  getLastViewBreadcrumb,
  removeLastViewBreadcrumb,
  defaultViewBreadcrumb,
} from '../manager';

export function handleOnDrop(type: SbpmElementType, position: Coordinates) {
  const element = addSbpmElement(type, position);
  currentlySelectedSbpmShape.update(() => element);
}

export function handleOnReset() {
  reset();
}

export function handleOnClear() {
  clear();
}

export function handleGoHome() {
  const lastViewBreadcrumb = getLastViewBreadcrumb();
  if (lastViewBreadcrumb.type !== 'Process') {
    const {
      type,
      properties: { id },
    } = get(defaultViewBreadcrumb);
    addViewBreadcrumb({
      type: type,
      id: id,
    });
    restoreView(id);
    updateActivePaletteItems(type);
  }
}

export function handleGoBack() {
  const previousViewBreadcrumb = getPreviousViewBreadcrumb();
  if (previousViewBreadcrumb) {
    restoreView(previousViewBreadcrumb.id);
    updateActivePaletteItems(previousViewBreadcrumb.type);
    removeLastViewBreadcrumb();
  }
}

export function handleOnSelectNavigationItem(item: SbpmProcessItem) {
  addViewBreadcrumb({
    id: item.properties.id,
    type: item.type,
  });
  updateActivePaletteItems(item.type);
  restoreView(item.properties.id);
}
