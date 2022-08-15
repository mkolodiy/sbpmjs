import SbpmModeler from '@sbpmjs/modeler';
import type { ElementEventHandlerParams, LinkEventHandlerParams } from '@sbpmjs/modeler';
import {
  createSbpmGeneralEntityItem,
  type Coordinates,
  type SbpmElementType,
  type SbpmProcessItem,
  type SbpmProcessItemGroup,
  type SbpmType,
} from '@sbpmjs/shared';
import { createSbpmElementItem } from '@sbpmjs/shared';
import { get, writable } from 'svelte/store';
import { createRandomUUID } from '../common';
import { processModelIcon, subjectIcon, messageIcon, sendStateIcon, receiveStateIcon, functionStateIcon } from '../icons';

const defaultProcess = createSbpmGeneralEntityItem({
  type: 'Process',
  properties: {
    id: createRandomUUID(),
    label: 'Default process',
    contains: [],
  },
});

type PaletteItem = {
  type: SbpmElementType;
  icon: string;
  size: {
    width: number;
    height: number;
  };
  title: string;
};

const processModelPaletteItem: PaletteItem = {
  type: 'ProcessModel',
  icon: processModelIcon,
  size: {
    width: 130,
    height: 70,
  },
  title: 'Process Model',
};

const paletteItems: Record<SbpmType, PaletteItem[]> = {
  Process: [processModelPaletteItem],
  ProcessModel: [
    {
      type: 'Subject',
      icon: subjectIcon,
      size: {
        width: 85,
        height: 140,
      },
      title: 'Subject',
    },
  ],
  MessageTransition: [
    {
      type: 'Message',
      icon: messageIcon,
      size: {
        width: 120,
        height: 75,
      },
      title: 'Message',
    },
  ],
  Subject: [
    {
      type: 'SendState',
      icon: sendStateIcon,
      size: {
        width: 140,
        height: 95,
      },
      title: 'Send state',
    },
    {
      type: 'ReceiveState',
      icon: receiveStateIcon,
      size: {
        width: 140,
        height: 95,
      },
      title: 'Receive state',
    },
    {
      type: 'FunctionState',
      icon: functionStateIcon,
      size: {
        width: 90,
        height: 140,
      },
      title: 'Receive state',
    },
  ],
  ProcessNetwork: [],
  Message: [],
  SendState: [],
  ReceiveState: [],
  FunctionState: [],
  ProcessTransition: [],
  FunctionStateTransition: [],
  SendStateTransition: [],
  ReceiveStateTransition: [],
};

export const showProperties = writable(false);

export const uiVisible = writable(true);

export const currentlySelectedSbpmShape = writable<ElementEventHandlerParams | LinkEventHandlerParams>();

export function updateCurrentlySelectedSbpmShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  currentlySelectedSbpmShape.update(() => shape);
}

export const activePaletteItems = writable<PaletteItem[]>([processModelPaletteItem]);

export function updateActivePaletteItems(palette: SbpmType) {
  activePaletteItems.update(() => paletteItems[palette]);
}

type ViewBreadcrumb = {
  type: SbpmType;
  id: string;
};

export const viewBreadcrumbs: ViewBreadcrumb[] = [];

export const defaultViewBreadcrumb = writable<SbpmProcessItem<'Process'>>(defaultProcess);

export function updateDefaultViewBreadcrumb(breadcrumb: SbpmProcessItem<'Process'>) {
  defaultViewBreadcrumb.update(() => breadcrumb);
}

export function addViewBreadcrumb(breadcrumb: ViewBreadcrumb) {
  viewBreadcrumbs.push(breadcrumb);
}

export function removeLastViewBreadcrumb() {
  viewBreadcrumbs.pop();
}

export function getLastViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 1];
}

export function getPreviousViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 2];
}

const views: Record<string, string[]> = {};

export function getViews() {
  return views;
}

export function getOrCreateView(view: string) {
  const viewItems = views[view];
  if (!viewItems) {
    updateView(view, []);
  }
  return views[view];
}

export function updateView(view: string, items: string[]) {
  views[view] = [...(views[view] ?? []), ...items];
}

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

const store: Record<string, SbpmProcessItem> = {};

export function getItemById(id: string) {
  return store[id];
}

export function getItems() {
  return store;
}

export function getItemsByIds(ids: string[]) {
  return ids.map((id) => store[id]);
}

export function addItem(item: SbpmProcessItem) {
  const id = item.properties.id;
  store[id] = item;
}

export function updateItem(id: string, optionsContainer: Omit<OptionsContainer, 'id'>) {
  const item = store[id];
  console.log(id);
  console.log(item);

  for (const key of Object.keys(optionsContainer)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = optionsContainer[key];
    if (value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      item.properties[key] = optionsContainer[key];
    }
  }
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

  const process = processItemGroup.find((item) => item.type === 'Process');
  if (!process) {
    throw new Error('Process is not defined in the provided process item group.');
  }

  restoreView(process.properties.id);
  updateDefaultViewBreadcrumb(process);
  addViewBreadcrumb({
    type: process.type,
    id: process.properties.id,
  });
  updateCurrentlySelectedNavigatorItem(process);
  initElementNavigatorItems();
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
      console.log('test');

      updateCurrentlySelectedSbpmShape(element);
      showProperties.update(() => true);
    },
    onSelectLink: (link) => {
      console.log('test');
      updateCurrentlySelectedSbpmShape(link);
      showProperties.update(() => true);
    },
    onClickCanvas: () => {
      showProperties.update(() => false);
    },
  });

  addInitialElement();
}

export function addInitialElement() {
  addSbpmElement('ProcessNetwork', { x: 400, y: 200 });
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

  const element = modeler.addElement(item.type, item.properties);

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
  addInitialElement();
}

export type OptionsContainer = {
  id: string;
  label?: string;
  position?: Coordinates;
  subject?: string;
  message?: string;
};

export const optionsContainer = writable<OptionsContainer>({
  id: '',
  label: '',
  position: { x: 0, y: 0 },
  subject: '',
  message: '',
});
