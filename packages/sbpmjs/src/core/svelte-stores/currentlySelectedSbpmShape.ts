import type { ElementEventHandlerParams, LinkEventHandlerParams } from '@sbpmjs/modeler';
import { writable } from 'svelte/store';

export const currentlySelectedSbpmShape = writable<ElementEventHandlerParams | LinkEventHandlerParams>();

export function updateCurrentlySelectedSbpmShape(shape: ElementEventHandlerParams | LinkEventHandlerParams) {
  currentlySelectedSbpmShape.update(() => shape);
}
