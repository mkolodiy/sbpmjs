import type { ElementEventHandlerParams, LinkEventHandlerParams } from '@sbpmjs/modeler';
import { writable } from 'svelte/store';

export const activeProcessModelId = writable<string>();

export const activeSubjectId = writable<string>();

export const currentlySelectedSbpmShape = writable<ElementEventHandlerParams | LinkEventHandlerParams>();

export function updateCurrentlySelectedSbpmShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  if (shape.type === 'ProcessModel') {
    activeProcessModelId.update(() => String(shape.id));
  }
  if (shape.type === 'Subject') {
    activeSubjectId.update(() => String(shape.id));
  }
  currentlySelectedSbpmShape.update(() => shape);
}
