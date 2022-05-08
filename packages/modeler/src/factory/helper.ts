import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkOptions } from '../link';
import SbpmProcessModel from '../process-model';
import SbpmProcessNetwork from '../process-network';
import SbpmProcessNetworkTransition, { createProcessNetworkTransitionOptions } from '../process-network-transition';
import SbpmMessageTransition, { createMessageTransitionOptions } from '../message-transition';
import SbpmSubject from '../subject';

export function getDefaultLink(type: string) {
  if (type === SbpmElementType.PROCESS_NETWORK) {
    return new SbpmProcessNetworkTransition(createProcessNetworkTransitionOptions());
  }

  if (type === SbpmElementType.SUBJECT) {
    return new SbpmMessageTransition(createMessageTransitionOptions());
  }

  return new SbpmLink();
}

export function isValidConnection(_cellViewS: joint.dia.CellView, cellViewT: joint.dia.CellView, linkView: joint.dia.LinkView) {
  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessModel && linkView.model instanceof SbpmProcessNetworkTransition) {
    return true;
  }

  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmSubject && linkView.model instanceof SbpmMessageTransition) {
    return true;
  }

  return false;
}

export function validateLinkOptions(type: string, options: SbpmLinkOptions) {
  const { source, target } = options;

  switch (type) {
    case SbpmElementType.PROCESS_NETWORK_TRANSITION:
      validateSbpmProcessNetworkTransitionOptions(source, target);
      break;
    case SbpmElementType.MESSAGE_TRANSITION:
      validateSbpmMessageTransitionOptions(source, target);
      break;
    default:
      throw Error(`${type} is not supported`);
  }
}

function validateSbpmProcessNetworkTransitionOptions(source: unknown, target: unknown) {
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
