import { SbpmFunctionStateTransition } from './functional-state-transition';
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

export const elementTypeToElementClassMapping = {
  ProcessNetwork: SbpmProcessNetwork,
  ProcessModel: SbpmProcessModel,
  Subject: SbpmSubject,
  SendState: SbpmSendState,
  ReceiveState: SbpmReceiveState,
  FunctionState: SbpmFunctionState,
} as const;

export const linkTypeToLinkClassMapping = {
  ProcessTransition: SbpmProcessTransition,
  MessageTransition: SbpmMessageTransition,
  SendStateTransition: SbpmSendStateTransition,
  ReceiveStateTransition: SbpmReceiveStateTransition,
  FunctionStateTransition: SbpmFunctionStateTransition,
} as const;

export const elementTypeToLinkClassMapping = {
  ProcessNetwork: SbpmProcessTransition,
  ProcessModel: SbpmProcessTransition,
  Subject: SbpmMessageTransition,
  SendState: SbpmSendStateTransition,
  ReceiveState: SbpmReceiveStateTransition,
  FunctionState: SbpmFunctionStateTransition,
} as const;
