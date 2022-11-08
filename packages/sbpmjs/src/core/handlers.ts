import type { SbpmElementType, Coordinates, SbpmProcessItem } from '@sbpmjs/shared';
import { get } from 'svelte/store';
import { addSbpmElement, reset, clear, restoreView } from './manager';
import { addItem, getItemById, getItems, updateItemById } from './store';
import { updateActivePaletteItems } from './svelte-stores/activePaletteItems';
import { updateCurrentlySelectedSbpmShape, currentlySelectedSbpmShape } from './svelte-stores/currentlySelectedSbpmShape';
import { currentlySelectedNavigatorItem, initElementNavigatorItems, updateCurrentlySelectedNavigatorItem } from './svelte-stores/elementNavigatorItems';
import type { OptionsContainer } from './svelte-stores/optionsContainer';
import { showProperties } from './svelte-stores/showProperties';
import {
  getLastViewBreadcrumb,
  defaultViewBreadcrumb,
  addViewBreadcrumb,
  getPreviousViewBreadcrumb,
  removeLastViewBreadcrumb,
} from './svelte-stores/viewBreadcrumbs';
import { updateView, getViews, getOrCreateView } from './views';

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
  getOrCreateView(id);
  initElementNavigatorItems();
  console.log(getItems());
  console.log(getViews());
}

export function handleOnReset() {
  showProperties.update(() => false);
  reset();
}

export function handleOnClear() {
  // TODO: Change to use a dialog
  const confirmation = confirm('This will delete all elements and their children. Proceed?');
  if (!confirmation) {
    return;
  }
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
  updateItemById(id, restOptions);
}
