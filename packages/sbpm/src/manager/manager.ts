import type { Coordinates, SbpmElementType } from '@sbpmjs/shared';
import { addSbpmElement, reset } from './modeler';
import { currentlySelectedSbpmShape } from './core';

export function handleOnDrop(type: SbpmElementType, position: Coordinates) {
  const element = addSbpmElement(type, position);
  currentlySelectedSbpmShape.update(() => element);
}

export function handleOnReset() {
  reset();
}
