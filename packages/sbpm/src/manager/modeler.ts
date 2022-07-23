import SbpmModeler from '@sbpmjs/modeler';
import { constructSbpmElementItem, type Coordinates, type SbpmElementType } from '@sbpmjs/shared';
import { getItems } from './store';
import { getView } from './core';
import { createRandomUUID } from '../common';

let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

export function initModeler() {
  const container = document.querySelector<HTMLElement>('.sbpm-modeler');

  if (!container) {
    throw new Error('Could not find container element for SbpmModeler');
  }

  modeler = new SbpmModeler({
    container,
    onOpenElement: (element) => {
      restoreView(String(element.id));
    },
    onOpenLink: (link) => {
      restoreView(String(link.id));
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
  modeler.canvas.clear();
  addInitialElement();
}
