import SbpmModeler from '@sbpmjs/modeler';
import {
  constructSbpmElementItem,
  type Coordinates,
  type SbpmElementType,
  type SbpmMessageTransitionType,
  type SbpmProcess,
  type SbpmProcessItem,
  type SbpmProcessModelType,
  type SbpmShapeType,
  type SbpmSubjectType,
} from '@sbpmjs/shared';
import { writable } from 'svelte/store';
import { createRandomUUID } from './common';
import { processModelIcon, subjectIcon, messageIcon, sendStateIcon, receiveStateIcon, functionStateIcon } from './icons';

const defaultViewKey = 'defaultView';
type DefaultViewKey = typeof defaultViewKey;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const defaultViewItem = constructSbpmElementItem<DefaultViewKey>({
  type: 'defaultView',
  properties: {
    id: defaultViewKey,
    label: 'Default view',
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

type PaletteItemKey = DefaultViewKey | SbpmProcessModelType | SbpmMessageTransitionType | SbpmSubjectType;

const PaletteItems: Record<PaletteItemKey, PaletteItem[]> = {
  defaultView: [processModelPaletteItem],
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
};

export const uiVisible = writable(true);

export const currentlySelectedSbpmShape = writable();

export const activePaletteItems = writable<PaletteItem[]>([processModelPaletteItem]);

export function setActivePaletteItems(palette: PaletteItemKey) {
  activePaletteItems.update(() => PaletteItems[palette]);
}

const views: Record<string, string[]> = {
  [defaultViewKey]: [],
};

type ViewBreadcrumb = {
  type: SbpmShapeType | DefaultViewKey;
  id: string;
};

const defaultViewBreadcrumb: ViewBreadcrumb = {
  type: 'defaultView',
  id: defaultViewKey,
};

const viewBreadcrumbs: ViewBreadcrumb[] = [defaultViewBreadcrumb];

function addViewBreadcrumb(breadcrumb: ViewBreadcrumb) {
  viewBreadcrumbs.push(breadcrumb);
}

function removeLastViewBreadcrumb() {
  viewBreadcrumbs.pop();
}

function getLastViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 1];
}

function getPreviousViewBreadcrumb() {
  return viewBreadcrumbs[viewBreadcrumbs.length - 2];
}

export function getViews() {
  return views;
}

export function getView(view: string) {
  const viewItems = views[view];
  if (!viewItems) {
    setView(view, []);
  }
  return views[view];
}

export function setView(view: string, items: string[]) {
  views[view] = [...(views[view] ?? []), ...items];
}

const store: Record<string, SbpmProcessItem> = {};

export const elementNavigatorItems = writable<SbpmProcessItem[]>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const currentlySelectedNavigatorItem = writable<SbpmProcessItem>(defaultViewItem);

export function loadProcess(process: SbpmProcess) {
  process.forEach((item) => {
    const type = item.type;
    const id = item.properties.id;
    const properties = item.properties;

    store[id] = item;

    if (isDefaultViewType(type)) {
      setView(defaultViewKey, [id]);
    }

    if ('contains' in properties) {
      setView(id, properties?.contains ?? []);
    }
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store[defaultViewKey] = defaultViewItem;

  restoreView(defaultViewKey);
  initElementNavigatorItems();

  console.log(getViews());
  console.log(store);
}

export function getItems(ids: string[]) {
  return ids.map((id) => store[id]);
}

export function initElementNavigatorItems() {
  const views = getViews();
  const ids = Object.keys(views);
  elementNavigatorItems.update(() => getItems(ids));
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
      setActivePaletteItems(element.type as PaletteItemKey);
      addViewBreadcrumb({
        type: element.type,
        id: String(element.id),
      });
      restoreView(String(element.id));
      initElementNavigatorItems();
    },
    onOpenLink: (link) => {
      setActivePaletteItems(link.type as PaletteItemKey);
      addViewBreadcrumb({
        type: link.type,
        id: String(link.id),
      });
      restoreView(String(link.id));
      initElementNavigatorItems();
    },
  });

  addInitialElement();
}

export function addInitialElement() {
  addSbpmElement('ProcessNetwork', { x: 400, y: 100 });
}

export function restoreView(view: string) {
  const ids = getView(view);
  const items = getItems(ids);
  modeler.restoreView(items);
}

export function addSbpmElement(type: SbpmElementType, position: Coordinates) {
  const item = constructSbpmElementItem({
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
  if (lastViewBreadcrumb.type !== 'defaultView') {
    addViewBreadcrumb(defaultViewBreadcrumb);
    restoreView(defaultViewBreadcrumb.id);
    setActivePaletteItems(defaultViewBreadcrumb.type as PaletteItemKey);
  }
}

export function handleGoBack() {
  const previousViewBreadcrumb = getPreviousViewBreadcrumb();
  if (previousViewBreadcrumb) {
    restoreView(previousViewBreadcrumb.id);
    setActivePaletteItems(previousViewBreadcrumb.type as PaletteItemKey);
    removeLastViewBreadcrumb();
  }
}

export function handleOnSelectNavigationItem(item: SbpmProcessItem) {
  addViewBreadcrumb({
    id: item.properties.id,
    type: item.type,
  });
  setActivePaletteItems(item.type as PaletteItemKey);
  restoreView(item.properties.id);
}

function isDefaultViewType(type: SbpmShapeType) {
  return type === 'ProcessNetwork' || type === 'ProcessModel' || type === 'ProcessTransition';
}
