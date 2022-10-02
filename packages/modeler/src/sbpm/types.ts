import type {
  SbpmProcessNetwork as SbpmProcessNetworkOptions,
  SbpmProcessModel as SbpmProcessModelOptions,
  SbpmMessage as SbpmMessageOptions,
  SbpmSubject as SbpmSubjectOptions,
  SbpmSendState as SbpmSendStateOptions,
  SbpmReceiveState as SbpmReceiveStateOptions,
  SbpmFunctionState as SbpmFunctionStateOptions,
  SbpmProcessTransition as SbpmProcessTransitionOptions,
  SbpmProcessTransition as SbpmMessageTransitionOptions,
  SbpmSendStateTransition as SbpmSendStateTransitionOptions,
  SbpmReceiveStateTransition as SbpmReceiveStateTransitionOptions,
  SbpmFunctionStateTransition as SbpmFunctionStateTransitionOptions,
} from '@sbpmjs/shared';
import type { GetUpdateOptions } from '../common';
import { SbpmProcessNetwork } from './process-network';
import { SbpmProcessModel } from './process-model';
import { SbpmMessage } from './message';
import { SbpmSubject } from './subject';
import { SbpmSendState } from './send-state';
import { SbpmReceiveState } from './receive-state';
import { SbpmFunctionState } from './function-state';
import { SbpmProcessTransition } from './process-transition';
import { SbpmMessageTransition } from './message-transition';
import { SbpmSendStateTransition } from './send-state-transition';
import { SbpmFunctionStateTransition } from './function-state-transition';
import { SbpmReceiveStateTransition } from './receive-state-transition';
import { SbpmElement, SbpmLink } from '../core';

type GetElementOptionsType<T extends SbpmElement> = T extends SbpmProcessNetwork
  ? SbpmProcessNetworkOptions
  : T extends SbpmProcessModel
  ? SbpmProcessModelOptions
  : T extends SbpmMessage
  ? SbpmMessageOptions
  : T extends SbpmSubject
  ? SbpmSubjectOptions
  : T extends SbpmSendState
  ? SbpmSendStateOptions
  : T extends SbpmReceiveState
  ? SbpmReceiveStateOptions
  : T extends SbpmFunctionState
  ? SbpmFunctionStateOptions
  : undefined;

export type GetSbpmElementUpdateOptions<T extends SbpmElement> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T extends SbpmLink> = T extends SbpmProcessTransition
  ? SbpmProcessTransitionOptions
  : T extends SbpmMessageTransition
  ? SbpmMessageTransitionOptions
  : T extends SbpmSendStateTransition
  ? SbpmSendStateTransitionOptions
  : T extends SbpmReceiveStateTransition
  ? SbpmReceiveStateTransitionOptions
  : T extends SbpmFunctionStateTransition
  ? SbpmFunctionStateTransitionOptions
  : undefined;

export type GetSbpmLinkUpdateOptions<T extends SbpmLink> = GetUpdateOptions<GetLinkOptionsType<T>>;

export type ElementTypeToElementClassMapping = {
  ProcessNetwork: SbpmProcessNetwork;
  ProcessModel: SbpmProcessModel;
  Message: SbpmMessage;
  Subject: SbpmSubject;
  SendState: SbpmSendState;
  ReceiveState: SbpmReceiveState;
  FunctionState: SbpmFunctionState;
};

export type LinkTypeToLinkClassMapping = {
  ProcessTransition: SbpmProcessTransition;
  MessageTransition: SbpmMessageTransition;
  SendStateTransition: SbpmSendStateTransition;
  ReceiveStateTransition: SbpmReceiveStateTransition;
  FunctionStateTransition: SbpmFunctionStateTransition;
};
