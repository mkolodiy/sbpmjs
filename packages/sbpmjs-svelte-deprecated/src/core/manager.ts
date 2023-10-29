import SbpmModeler, { type ElementEventHandlerParams, type LinkEventHandlerParams } from '@sbpmjs/modeler';
import {
  createSbpmElementItem,
  isSbpmLinkType,
  type Coordinates,
  type SbpmElementItem,
  type SbpmElementType,
  type SbpmLinkItem,
  type SbpmProcessItem,
  type SbpmProcessItemGroup,
  type SbpmShapeType,
} from '@sbpmjs/shared';
import { get } from 'svelte/store';
import { createRandomUUID } from '../common/utils';
import { defaultProcess, defaultProcessNetwork } from './common';
import { addItem, getItemById, getItemsByIds, resetItems, getItems, removeItemsById, removeItemById } from './store';
import { updateActivePaletteItems } from './svelte-stores/activePaletteItems';
import { updateCurrentlySelectedSbpmShape } from './svelte-stores/currentlySelectedSbpmShape';
import { updateCurrentlySelectedNavigatorItem, initElementNavigatorItems, currentlySelectedNavigatorItem } from './svelte-stores/elementNavigatorItems';
import { isRestoring, updateIsRestoring } from './svelte-stores/isRestoring';
import { showProperties, updateShowProperties } from './svelte-stores/showProperties';
import { updateView, getOrCreateView, resetViews, getViews, removeView, removeViews, getAllChildrenForView, removeItem } from './views';

let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      console.log('test');

      handleOnOpenShape(element.type, String(element.id));
    },
    onOpenLink: (link) => {
      handleOnOpenShape(link.type, String(link.id));
    },
    onSelectElement: (element) => {
      console.log(getViews());
      console.log(getItems());

      handleOnSelectShape(element);
    },
    onSelectLink: (link) => {
      handleOnSelectShape(link);
    },
    onAddShape: (shape) => {
      if (!isSbpmLinkType(shape.type) && !get(isRestoring)) {
        addShape(shape);
      }
    },
    onConnectLink: (link) => {
      addShape(link);
    },
    onClickCanvas: () => {
      showProperties.update(() => false);
    },
    onDeleteElement: (element) => {
      handleOnDeleteShape(element);
    },
    onDeleteLink: (link) => {
      handleOnDeleteShape(link);
    },
  });

  clear();
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

function init(process: SbpmProcessItem<'Process'>) {
  restoreView(process.properties.id);
  updateCurrentlySelectedNavigatorItem(process);
  initElementNavigatorItems();
}

export function reset() {
  modeler.canvas.reset();
}

export function clear() {
  modeler.canvas.reset();
  modeler.canvas.clear();
  resetItems();
  resetViews();
  addItem(defaultProcess);
  addItem(defaultProcessNetwork);
  init(defaultProcess);
  // updateView(defaultProcess.properties.id, [defaultProcessNetwork.properties.id]);
  modeler.addSbpmElement(defaultProcessNetwork);
}

export function zoomIn() {
  modeler.canvas.zoomIn();
}

export function zoomOut() {
  modeler.canvas.zoomOut();
}

export function restoreView(view: string) {
  updateIsRestoring(true);
  const ids = getOrCreateView(view);
  const items = getItemsByIds(ids);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modeler.restoreView(items);
  updateIsRestoring(false);
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

function handleOnOpenShape(type: SbpmShapeType, id: string) {
  console.log('Test');

  updateActivePaletteItems(type);
  updateCurrentlySelectedNavigatorItem(getItemById(id));
  restoreView(id);
  initElementNavigatorItems();
  updateShowProperties(false);
}

function handleOnSelectShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  updateCurrentlySelectedSbpmShape(shape);
  updateShowProperties(true);
}

function handleOnDeleteShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  const id = String(shape.id);
  const allChildren = getAllChildrenForView(id);
  removeItemsById(allChildren);
  removeViews(allChildren);
  removeItemById(id);
  removeItem(id);
  removeView(id);
  showProperties.update(() => false);
  initElementNavigatorItems();
}

function addShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  const id = shape.id;
  addItem({
    type: shape.type,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    properties: {
      id: String(id),
      ...shape.getUpdatableOptions(),
    },
  });
  updateView(get(currentlySelectedNavigatorItem).properties.id, [String(id)]);
}

function getTransitions(parentId: string, childId: string, key: 'source' | 'target') {
  const children = getOrCreateView(parentId);
  const items = getItemsByIds(children);
  const oppositeKey = key === 'source' ? 'target' : 'source';
  return items.filter(
    (item) =>
      item.type === 'MessageTransition' &&
      (item.properties[key] === childId || (item.properties[oppositeKey] === childId && item.properties.role === 'bidirectional'))
  ) as SbpmLinkItem<'MessageTransition'>[];
}

export function getSenderTransitions(parentId: string, childId: string) {
  return getTransitions(parentId, childId, 'source');
}

export function getReceiveTransitions(parentId: string, childId: string) {
  return getTransitions(parentId, childId, 'target');
}

export function getMessages(transitionId: string) {
  return getItemsByIds(getOrCreateView(transitionId)) as SbpmElementItem<'Message'>[];
}

function getSubjects(transitions: SbpmLinkItem<'MessageTransition'>[], key: 'source' | 'target', childId: string) {
  const oppositeKey = key === 'source' ? 'target' : 'source';
  const ids = transitions.map((item) => {
    if (item.properties.role === 'bidirectional' && item.properties[oppositeKey] === childId) {
      return item.properties[key];
    }

    return item.properties[oppositeKey];
  });
  return getItemsByIds(ids) as SbpmElementItem<'Subject'>[];
}

export function getSenderSubjects(transitions: SbpmLinkItem<'MessageTransition'>[], childId: string) {
  return getSubjects(transitions, 'source', childId);
}

export function getReceiverSubjects(transitions: SbpmLinkItem<'MessageTransition'>[], childId: string) {
  return getSubjects(transitions, 'target', childId);
}
