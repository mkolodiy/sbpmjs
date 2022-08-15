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
  updateCurrentlySelectedNavigatorItem,
  getItemById,
  type OptionsContainer,
  showProperties,
} from '../manager';

export function handleOnDrop(type: SbpmElementType, position: Coordinates) {
  showProperties.update(() => false);
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
  showProperties.update(() => false);
  reset();
}

export function handleOnClear() {
  showProperties.update(() => false);
  clear();
}

export function handleGoHome() {
  showProperties.update(() => false);
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
    updateCurrentlySelectedNavigatorItem(get(defaultViewBreadcrumb));
  }
}

export function handleGoBack() {
  showProperties.update(() => false);
  const previousViewBreadcrumb = getPreviousViewBreadcrumb();
  if (previousViewBreadcrumb) {
    restoreView(previousViewBreadcrumb.id);
    updateActivePaletteItems(previousViewBreadcrumb.type);
    updateCurrentlySelectedNavigatorItem(getItemById(previousViewBreadcrumb.id));
    removeLastViewBreadcrumb();
  }
}

export function handleOnSelectNavigationItem(item: SbpmProcessItem) {
  showProperties.update(() => false);
  addViewBreadcrumb({
    id: item.properties.id,
    type: item.type,
  });
  updateActivePaletteItems(item.type);
  restoreView(item.properties.id);
}

export function handleOnUpdate(optionsContainer: OptionsContainer) {
  const { id, ...restOptions } = optionsContainer;
  const shape = get(currentlySelectedSbpmShape);
  shape.update(restOptions);
  updateItem(id, restOptions);
}
