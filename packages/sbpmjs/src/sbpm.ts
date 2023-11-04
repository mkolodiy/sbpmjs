import SbpmModeler from '@sbpmjs/modeler';
import {
  createSbpmElementItem,
  createSbpmGeneralEntityItem,
  type Coordinates,
  type SbpmElementType,
  type SbpmProcessItem,
  createSbpmProcessItem,
} from '@sbpmjs/shared';
import type { ElementEventHandlerParams, LinkEventHandlerParams } from '@sbpmjs/modeler';
import { get, writable } from 'svelte/store';
import { createRandomUUID } from './common/utils';

const defaultProcessNetwork = createSbpmElementItem({
  type: 'ProcessNetwork',
  properties: {
    id: createRandomUUID(),
    label: 'Default process network',
    position: {
      x: 200,
      y: 200,
    },
  },
});

const defaultProcess = createSbpmGeneralEntityItem({
  type: 'Process',
  properties: {
    id: createRandomUUID(),
    label: 'Default process',
    contains: [defaultProcessNetwork.properties.id],
  },
});

function useState() {
  const items: Map<string, SbpmProcessItem> = new Map();

  const addItem = (item: SbpmProcessItem) => {
    const id = item.properties.id;
    items.set(id, item);
  };

  const removeItem = (id: string) => {
    items.delete(id);
  };

  const getItems = () => {
    return Array.from(items.values());
  };

  const clear = () => {
    items.clear();
  };

  const addChild = (parentId: string, childId: string) => {
    const existingItem = items.get(parentId);
    if (!existingItem) {
      throw new Error(`Item with id ${parentId} not found`);
    }
    if ('contains' in existingItem.properties) {
      existingItem.properties.contains!.push(childId);
    } else {
      throw new Error(`Item with id ${parentId} is not a container`);
    }
  };

  const getContainerItems = () => {
    return getItems().filter((item) => 'contains' in item.properties);
  };

  return {
    addItem,
    removeItem,
    getItems,
    addChild,
    clear,
    getContainerItems,
  };
}

function useSvelteStores() {
  const viewedSbpmItem = writable<SbpmProcessItem>();
  const selectedSbpmItem = writable<ElementEventHandlerParams | LinkEventHandlerParams>();
  const uiVisible = writable(true);

  const updateViewedSbpmItem = (item: SbpmProcessItem) => {
    viewedSbpmItem.update(() => item);
  };

  const updateSelectedSbpmItem = (item: ElementEventHandlerParams | LinkEventHandlerParams) => {
    selectedSbpmItem.update(() => item);
  };

  const toggleUiVisible = () => {
    uiVisible.update((prevUiVisible) => !prevUiVisible);
  };

  return {
    viewedSbpmItem,
    selectedSbpmItem,
    uiVisible,
    updateViewedSbpmItem,
    updateSelectedSbpmItem,
    toggleUiVisible,
  };
}

function useModeler(state: ReturnType<typeof useState>, svelteStores: ReturnType<typeof useSvelteStores>) {
  let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

  const initModelerWithDefaults = (container: HTMLElement) => {
    if (!container) {
      throw new Error('container is required');
    }

    modeler = new SbpmModeler({
      container,
    });

    svelteStores.updateSelectedSbpmItem(modeler.addSbpmElement(defaultProcessNetwork));
  };

  return {
    initModelerWithDefaults,
    get modeler() {
      return modeler;
    },
  };
}

function useHandlers(modeler: ReturnType<typeof useModeler>, svelteStores: ReturnType<typeof useSvelteStores>) {
  const drop = (type: SbpmElementType, position: Coordinates) => {
    const viewedSbpmItem = get(svelteStores.viewedSbpmItem);
    const item = createSbpmElementItem({
      type: 'ProcessModel',
      properties: {
        id: createRandomUUID(),
        position,
        label: 'New element',
      },
    });
    state.addItem(item);
    state.addChild(viewedSbpmItem.properties.id, item.properties.id);
    svelteStores.updateSelectedSbpmItem(modeler.modeler.addSbpmElement(item));
  };

  const goHome = () => {};

  const reset = () => {
    modeler.modeler.canvas.reset();
  };

  const clear = () => {
    modeler.modeler.canvas.reset();
    modeler.modeler.canvas.clear();
    state.clear();
    state.addItem(defaultProcess);
    state.addItem(defaultProcessNetwork);
    svelteStores.updateViewedSbpmItem(defaultProcess);
    svelteStores.updateSelectedSbpmItem(modeler.modeler.addSbpmElement(defaultProcessNetwork));
  };

  const zoomIn = () => {
    modeler.modeler.canvas.zoomIn();
  };

  const zoomOut = () => {
    modeler.modeler.canvas.zoomOut();
  };

  return {
    drop,
    goHome,
    reset,
    clear,
    zoomIn,
    zoomOut,
  };
}

const state = useState();
const svelteStores = useSvelteStores();
const modeler = useModeler(state, svelteStores);
const handlers = useHandlers(modeler, svelteStores);

export { state, svelteStores, modeler, handlers };

export function initDefaults() {
  state.addItem(defaultProcess);
  state.addItem(defaultProcessNetwork);
  svelteStores.updateViewedSbpmItem(defaultProcess);
}
