import type { SbpmElementType, SbpmLinkType } from '../common';
import type { SbpmLinkOptions } from '../core';
import { elementTypeToLinkClassMapping } from './mappings';
import { SbpmProcessNetwork } from './process-network';
import { SbpmProcessModel } from './process-model';
import { SbpmSubject } from './subject';
import { SbpmSendState } from './send-state';
import { SbpmReceiveState } from './receive-state';
import { SbpmFunctionState } from './function-state';
import { SbpmProcessTransition } from './process-transition';
import { SbpmMessageTransition } from './message-transition';
import { SbpmSendStateTransition } from './send-state-transition';
import { SbpmReceiveStateTransition } from './receive-state-transition';
import { SbpmFunctionStateTransition } from './function-state-transition';

export function getDefaultLink(type: SbpmElementType) {
  return new elementTypeToLinkClassMapping[type]();
}

export function isValidConnection(cellViewS: joint.dia.CellView, cellViewT: joint.dia.CellView, linkView: joint.dia.LinkView) {
  const isProcessTransitionValid =
    cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessModel && linkView.model instanceof SbpmProcessTransition;
  const isMessageTransitionValid = cellViewT.model.isElement() && cellViewT.model instanceof SbpmSubject && linkView.model instanceof SbpmMessageTransition;
  const isSendStateTransitionValid =
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmFunctionState || cellViewT.model instanceof SbpmReceiveState) &&
    linkView.model instanceof SbpmSendStateTransition;
  const isReceiveStateTransitionValid =
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmFunctionState || cellViewT.model instanceof SbpmSendState) &&
    linkView.model instanceof SbpmReceiveStateTransition;
  const isFunctionStateTransitionValid =
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmSendState || cellViewT.model instanceof SbpmReceiveState) &&
    linkView.model instanceof SbpmFunctionStateTransition;
  const valid = cellViewS.model.get('id') !== cellViewT.model.get('id');

  return (
    valid &&
    (isProcessTransitionValid || isMessageTransitionValid || isSendStateTransitionValid || isReceiveStateTransitionValid || isFunctionStateTransitionValid)
  );
}

const linkTypeToValidationFnMapping = {
  ProcessTransition: validateSbpmProcessTransitionOptions,
  MessageTransition: validateSbpmMessageTransitionOptions,
  SendStateTransition: validateSbpmSendStateTransitionOptions,
  ReceiveStateTransition: validateSbpmReceiveStateTransitionOptions,
  FunctionStateTransition: validateSbpmFunctionStateTransitionOptions,
} as const;

export function validateLinkOptions(type: SbpmLinkType, options: SbpmLinkOptions) {
  const { source, target } = options;
  linkTypeToValidationFnMapping[type](source, target);
}

function validateSbpmProcessTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmProcessNetwork) && !(source instanceof SbpmProcessModel)) {
    throw Error('Source has to be of type SbpmProcessNetwork or SbpmProcessModel');
  }

  if (!(target instanceof SbpmProcessModel)) {
    throw Error('Target has to be of type SbpmProcessModel');
  }
}

function validateSbpmMessageTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmSubject)) {
    throw Error('Source has to be of type SbpmSubject');
  }

  if (!(target instanceof SbpmSubject)) {
    throw Error('Target has to be of type SbpmSubject');
  }
}

function validateSbpmFunctionStateTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmFunctionState)) {
    throw Error('Source has to be of type SbpmFunctionState');
  }

  if (!(target instanceof SbpmSendState) && !(target instanceof SbpmReceiveState)) {
    throw Error('Target has to be of type SbpmSendState or SbpmReceiveState');
  }
}

function validateSbpmSendStateTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmSendState)) {
    throw Error('Source has to be of type SbpmFunctionState');
  }

  if (!(target instanceof SbpmFunctionState) && !(target instanceof SbpmReceiveState)) {
    throw Error('Target has to be of type SbpmSendState or SbpmReceiveState');
  }
}

function validateSbpmReceiveStateTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmReceiveState)) {
    throw Error('Source has to be of type SbpmFunctionState');
  }

  if (!(target instanceof SbpmFunctionState) && !(target instanceof SbpmSendState)) {
    throw Error('Target has to be of type SbpmSendState or SbpmReceiveState');
  }
}
