import { getSbpmType, SbpmLinkType } from '../common';
import type { ValueOf } from '../common';
import { SbpmProcessTransition } from './process-transition';
import { elementTypeToLinkClassMapping } from './mappings';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmLinkOptions } from '../core';

export function getDefaultLink(type: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new elementTypeToLinkClassMapping[getSbpmType(type)]();
}

export function isValidConnection(_cellViewS: joint.dia.CellView, cellViewT: joint.dia.CellView, linkView: joint.dia.LinkView) {
  const isProcessTransitionValid =
    cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessTransition && linkView.model instanceof SbpmProcessTransition;

  return isProcessTransitionValid;
}

const linkTypeToValidationFnMapping = {
  [SbpmLinkType.PROCESS_TRANSITION]: validateSbpmProcessTransitionOptions,
} as const;

export function validateLinkOptions(type: ValueOf<typeof SbpmLinkType>, options: SbpmLinkOptions) {
  const { source, target } = options;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  linkTypeToValidationFnMapping[type](source, target);
}

function validateSbpmProcessTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmProcessNetwork)) {
    throw Error('Source has to be of type SbpmProcessNetwork');
  }

  if (!(target instanceof SbpmProcessTransition)) {
    throw Error('Target has to be of type SbpmProcessModel');
  }
}
