import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkOptions } from '../link';
import SbpmProcessModel from '../process-model';
import SbpmProcessNetwork from '../process-network';
import SbpmProcessNetworkTransition, { createProcessNetworkTransitionOptions } from '../process-network-transition';

export function getDefaultLink(type: string) {
  if (type === SbpmElementType.PROCESS_NETWORK) {
    return new SbpmProcessNetworkTransition(createProcessNetworkTransitionOptions());
  }

  return new SbpmLink();
}

export function isValidConnection(cellViewS: joint.dia.CellView, cellViewT: joint.dia.CellView, linkView: joint.dia.LinkView) {
  // Prevent link to link connections
  if (cellViewS.model.isLink() || cellViewT.model.isLink()) {
    return false;
  }

  // Prevent source to target connection
  if (cellViewS.model.get('id') === cellViewT.model.get('id')) {
    return false;
  }

  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessModel && linkView.model instanceof SbpmProcessNetworkTransition) {
    return true;
  }

  if (cellViewT.model.isElement() && cellViewT.model instanceof SbpmProcessNetwork && linkView.model instanceof SbpmProcessNetworkTransition) {
    return false;
  }

  return true;
}

export function validateLinkOptions(type: string, options: SbpmLinkOptions) {
  const { source, target } = options;

  switch (type) {
    case SbpmElementType.PROCESS_NETWORK_TRANSITION:
      validateSbpmProcessNetworkTransitionOptions(source, target);
      break;
    default:
      throw Error(`${type} is not supported`);
  }
}

function validateSbpmProcessNetworkTransitionOptions(source: unknown, target: unknown) {
  if (!(source instanceof SbpmProcessNetwork)) {
    throw Error('SbpmProcessNetworkTransition: Source has to be of type SbpmProcessNetwork');
  }

  if (!(target instanceof SbpmProcessModel)) {
    throw Error('SbpmProcessNetworkTransition: target has to be of type SbpmProcessModel');
  }
}
