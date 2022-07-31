import type { SbpmElementType, Coordinates, SbpmProcessItem } from '@sbpmjs/shared';
import { get } from 'svelte/store';
import {
  addSbpmElement,
  updateCurrentlySelectedSbpmShape,
  reset,
  clear,
  restoreView,
  updateActivePaletteItems,
  getPreviousViewBreadcrumb,
  addViewBreadcrumb,
  getLastViewBreadcrumb,
  removeLastViewBreadcrumb,
  defaultViewBreadcrumb,
  addItem,
  updateView,
  currentlySelectedNavigatorItem,
  getItems,
  getViews,
  currentlySelectedSbpmShape,
  updateItem,
} from '../manager';

export function handleOnDrop(type: SbpmElementType, position: Coordinates) {
  const element = addSbpmElement(type, position);
  const id = String(element.id);
  updateCurrentlySelectedSbpmShape(element);
  addItem({
    type: type,
    properties: {
      id,
      position,
      label: 'New element',
    },
  });
  updateView(get(currentlySelectedNavigatorItem).properties.id, [id]);

  console.log(getItems());
  console.log(getViews());
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

export function handleOnUpdate(label: string, position: Coordinates) {
  const shape = get(currentlySelectedSbpmShape);
  shape.update({
    label,
    position,
  });
  updateItem(String(shape.id), label, position);
}
