import SbpmModeler from '@sbpmjs/modeler';
import { constructSbpmElementItem, type Coordinates, type SbpmElementType } from '@sbpmjs/shared';
import { getItems } from './store';
import { getView } from './core';
import { createRandomUUID } from '../common';

export let modeler: SbpmModeler = undefined as unknown as SbpmModeler;

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

  const element = modeler.addElement(item.type, item.properties);

  return element;
}
