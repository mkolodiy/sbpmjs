import type { SbpmElementType, Coordinates, SbpmProcessItem } from '@sbpmjs/shared';
import { get } from 'svelte/store';
import { defaultProcess } from './common';
import { addSbpmElement, reset, clear, restoreView, zoomIn, zoomOut } from './manager';
import { updateItemById } from './store';
import { updateActivePaletteItems } from './svelte-stores/activePaletteItems';
import { updateCurrentlySelectedSbpmShape, currentlySelectedSbpmShape } from './svelte-stores/currentlySelectedSbpmShape';
import { initElementNavigatorItems, updateCurrentlySelectedNavigatorItem } from './svelte-stores/elementNavigatorItems';
import type { OptionsContainer } from './svelte-stores/optionsContainer';
import { showProperties } from './svelte-stores/showProperties';
import { getOrCreateView } from './views';

const allowedViewTypes: SbpmElementType[] = ['ProcessModel', 'Subject'];

export function handleOnDrop(type: SbpmElementType, position: Coordinates) {
  showProperties.update(() => false);
  const element = addSbpmElement(type, position);
  const id = String(element.id);
  updateCurrentlySelectedSbpmShape(element);
  // addItem({
  //   type: type,
  //   properties: {
  //     id,
  //     position,
  //     label: 'New element',
  //   },
  // });
  // updateView(get(currentlySelectedNavigatorItem).properties.id, [id]);
  if (allowedViewTypes.includes(type)) {
    getOrCreateView(id);
  }
  initElementNavigatorItems();
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

export function handleOnZoomIn() {
  zoomIn();
}

export function handleOnZoomOut() {
  zoomOut();
}

export function handleGoHome() {
  showProperties.update(() => false);
  updateActivePaletteItems(defaultProcess.type);
  updateCurrentlySelectedNavigatorItem(defaultProcess);
  restoreView(defaultProcess.properties.id);
}

export function handleOnSelectNavigationItem(item: SbpmProcessItem) {
  showProperties.update(() => false);
  updateActivePaletteItems(item.type);
  restoreView(item.properties.id);
}

export function handleOnUpdate(optionsContainer: OptionsContainer) {
  const { id, ...restOptions } = optionsContainer;
  const shape = get(currentlySelectedSbpmShape);
  const updatableOptions = shape.getUpdatableOptions();
  const updatedOptions = {};
  for (const key of Object.keys(updatableOptions)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updatedOptions[key] = restOptions[key];
  }
  shape.update(updatedOptions);
  updateItemById(id, restOptions);
}
