import SbpmModeler from '@sbpmjs/modeler';
import { createSbpmElementItem, type Coordinates, type SbpmElementType, type SbpmProcessItem, type SbpmProcessItemGroup } from '@sbpmjs/shared';
import { get } from 'svelte/store';
import { createRandomUUID } from '../common/utils';
import { defaultProcess, defaultProcessNetwork } from './common';
import { addItem, getItemById, getItems, getItemsByIds, resetItems } from './store';
import { updateActivePaletteItems } from './svelte-stores/activePaletteItems';
import { updateCurrentlySelectedSbpmShape } from './svelte-stores/currentlySelectedSbpmShape';
import { updateCurrentlySelectedNavigatorItem, initElementNavigatorItems, currentlySelectedNavigatorItem } from './svelte-stores/elementNavigatorItems';
import { showProperties } from './svelte-stores/showProperties';
import { updateDefaultViewBreadcrumb, addViewBreadcrumb } from './svelte-stores/viewBreadcrumbs';
import { updateView, getViews, getOrCreateView, resetViews } from './views';

function init(process: SbpmProcessItem<'Process'>) {
  restoreView(process.properties.id);
  updateDefaultViewBreadcrumb(process);
  addViewBreadcrumb({
    type: process.type,
    id: process.properties.id,
  });
  updateCurrentlySelectedNavigatorItem(process);
  initElementNavigatorItems();
}

export function loadProcess(processItemGroup: SbpmProcessItemGroup) {
  processItemGroup.forEach((item) => {
    const id = item.properties.id;
    const properties = item.properties;

    addItem(item);

    if ('contains' in properties) {
      updateView(id, properties?.contains ?? []);
    }
  });

  const process = processItemGroup.find((item) => item.type === 'Process') as SbpmProcessItem<'Process'>;
  if (!process) {
    throw new Error('Process is not defined in the provided process item group.');
  }

  init(process);
}

let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      updateActivePaletteItems(element.type);
      addViewBreadcrumb({
        type: element.type,
        id: String(element.id),
      });
      updateCurrentlySelectedNavigatorItem(getItemById(String(element.id)));
      restoreView(String(element.id));
      initElementNavigatorItems();
    },
    onOpenLink: (link) => {
      updateActivePaletteItems(link.type);
      addViewBreadcrumb({
        type: link.type,
        id: String(link.id),
      });
      restoreView(String(link.id));
      initElementNavigatorItems();
    },
    onSelectElement: (element) => {
      updateCurrentlySelectedSbpmShape(element);
      showProperties.update(() => true);
    },
    onSelectLink: (link) => {
      updateCurrentlySelectedSbpmShape(link);
      showProperties.update(() => true);
    },
    onConnectLink: (link) => {
      console.log('test', link.getUpdatableOptions());
      const id = link.id;
      addItem({
        type: link.type,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        properties: {
          id: String(id),
          ...link.getUpdatableOptions(),
        },
      });
      updateView(get(currentlySelectedNavigatorItem).properties.id, [String(id)]);

      console.log(getViews());
      console.log(getItems());
    },
    onClickCanvas: () => {
      showProperties.update(() => false);
    },
  });

  addItem(defaultProcess);
  addItem(defaultProcessNetwork);
  init(defaultProcess);
  modeler.addSbpmElement(defaultProcessNetwork);
}

export function restoreView(view: string) {
  const ids = getOrCreateView(view);
  const items = getItemsByIds(ids);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modeler.restoreView(items);
}

export function addSbpmElement(type: SbpmElementType, position: Coordinates) {
  const item = createSbpmElementItem({
    type,
    properties: {
      id: createRandomUUID(),
      label: 'New element',
      position,
    },
  });

  const { tx, ty } = modeler.canvas.paper.translate();
  item.properties.position.x = item.properties.position.x - tx;
  item.properties.position.y = item.properties.position.y - ty;

  const element = modeler.addSbpmElement(item);

  return element;
}

export function reset() {
  modeler.canvas.reset();
}

export function clear() {
  // TODO: Change to use a dialog
  const confirmation = confirm('This will delete all elements and their children. Proceed?');
  if (!confirmation) {
    return;
  }
  modeler.canvas.reset();
  modeler.canvas.clear();
  resetItems();
  resetViews();
  addItem(defaultProcess);
  addItem(defaultProcessNetwork);
  init(defaultProcess);
  updateView(defaultProcess.properties.id, [defaultProcessNetwork.properties.id]);
  modeler.addSbpmElement(defaultProcessNetwork);
  console.log(getItems());
}
