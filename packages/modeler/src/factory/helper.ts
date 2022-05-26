import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkOptions } from '../link';
import SbpmProcessModel from '../process-model';
import SbpmProcessNetwork from '../process-network';
import SbpmProcessTransition, { createProcessTransitionOptions } from '../process-transition';
import SbpmMessageTransition, { createMessageTransitionOptions } from '../message-transition';
import SbpmSubject from '../subject';
import SbpmFunctionState from '../function-state';
import SbpmSendState from '../send-state';
import SbpmReceiveState from '../receive-state';
import SbpmFunctionStateTransition, { createFunctionStateTransitionOptions } from '../functional-state-transition';
import SbpmSendStateTransition, { createSendStateTransitionOptions } from '../send-state-transition';
import SbpmReceiveStateTransition, { createReceiveStateTransitionOptions } from '../receive-state-transition';

export function getDefaultLink(type: string) {
  if (type === SbpmElementType.PROCESS_NETWORK) {
    return new SbpmProcessTransition(createProcessTransitionOptions());
  }

  if (type === SbpmElementType.SUBJECT) {
    return new SbpmMessageTransition(createMessageTransitionOptions());
  }

  if (type === SbpmElementType.FUNCTION_STATE) {
    return new SbpmFunctionStateTransition(createFunctionStateTransitionOptions());
  }

  if (type === SbpmElementType.SEND_STATE) {
    return new SbpmSendStateTransition(createSendStateTransitionOptions());
  }

  if (type === SbpmElementType.RECEIVE_STATE) {
    return new SbpmReceiveStateTransition(createReceiveStateTransitionOptions());
  }

  return new SbpmLink();
}

export function isValidConnection(_cellViewS: joint.dia.CellView, cellViewT: joint.dia.CellView, linkView: joint.dia.LinkView) {
  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessModel && linkView.model instanceof SbpmProcessTransition) {
    return true;
  }

  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmSubject && linkView.model instanceof SbpmMessageTransition) {
    return true;
  }

  if (
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmSendState || cellViewT.model instanceof SbpmReceiveState) &&
    linkView.model instanceof SbpmFunctionStateTransition
  ) {
    return true;
  }

  if (
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmFunctionState || cellViewT.model instanceof SbpmReceiveState) &&
    linkView.model instanceof SbpmSendStateTransition
  ) {
    return true;
  }

  if (
    cellViewT.model.isElement() &&
    (cellViewT.model instanceof SbpmFunctionState || cellViewT.model instanceof SbpmSendState) &&
    linkView.model instanceof SbpmReceiveStateTransition
  ) {
    return true;
  }

  return false;
}

export function validateLinkOptions(type: string, options: SbpmLinkOptions) {
  const { source, target } = options;

  switch (type) {
    case SbpmElementType.PROCESS_TRANSITION:
      validateSbpmProcessTransitionOptions(source, target);
      break;
    case SbpmElementType.MESSAGE_TRANSITION:
      validateSbpmMessageTransitionOptions(source, target);
      break;
    case SbpmElementType.FUNCTION_STATE_TRANSITION:
      validateSbpmFunctionStateTransitionOptions(source, target);
      break;
    case SbpmElementType.SEND_STATE_TRANSITION:
      validateSbpmSendStateTransitionOptions(source, target);
      break;
    case SbpmElementType.RECEIVE_STATE_TRANSITION:
      validateSbpmReceiveStateTransitionOptions(source, target);
      break;
    default:
      throw Error(`${type} is not supported`);
  }
}

function validateSbpmProcessTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmProcessNetwork)) {
    throw Error('Source has to be of type SbpmProcessNetwork');
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
