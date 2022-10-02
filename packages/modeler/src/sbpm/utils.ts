import type { SbpmElementType, SbpmLinkType, SbpmLink as SbpmLinkOptions } from '@sbpmjs/shared';
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

export function getDefaultLink(type: Exclude<SbpmElementType, 'Message'>) {
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
