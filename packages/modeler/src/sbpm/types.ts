import type {
  GetUpdateOptions,
  SbpmProcessNetworkType,
  SbpmProcessModelType,
  SbpmSubjectType,
  SbpmSendStateType,
  SbpmReceiveStateType,
  SbpmFunctionStateType,
  SbpmProcessTransitionType,
  SbpmMessageTransitionType,
  SbpmSendStateTransitionType,
  SbpmReceiveStateTransitionType,
  SbpmFunctionStateTransitionType,
} from '../common';
import type { SbpmElementOptions as SbpmElementOptionsCore, SbpmLinkOptions as SbpmLinkOptionsCore } from '../core';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmProcessNetworkOptions } from './process-network';
import { SbpmProcessModel } from './process-model';
import type { SbpmProcessModelOptions } from './process-model';
import { SbpmSubject } from './subject';
import type { SbpmSubjectOptions } from './subject';
import { SbpmSendState } from './send-state';
import type { SbpmSendStateOptions } from './send-state';
import { SbpmReceiveState } from './receive-state';
import type { SbpmReceiveStateOptions } from './receive-state';
import { SbpmFunctionState } from './function-state';
import type { SbpmFunctionStateOptions } from './function-state';
import { SbpmProcessTransition } from './process-transition';
import type { SbpmProcessTransitionOptions } from './process-transition';
import { SbpmMessageTransition } from './message-transition';
import type { SbpmMessageTransitionOptions } from './message-transition';
import { SbpmSendStateTransition } from './send-state-transition';
import type { SbpmSendStateTransitionOptions } from './send-state-transition';
import { SbpmFunctionStateTransition } from './functional-state-transition';
import type { SbpmFunctionStateTransitionOptions } from './functional-state-transition';
import { SbpmReceiveStateTransition } from './receive-state-transition';
import type { SbpmReceiveStateTransitionOptions } from './receive-state-transition';

export type SbpmElementOptions =
  | SbpmProcessNetworkOptions
  | SbpmProcessModelOptions
  | SbpmSubjectOptions
  | SbpmSendStateOptions
  | SbpmReceiveStateOptions
  | SbpmFunctionStateOptions;

export type SbpmLinkOptions =
  | SbpmProcessTransitionOptions
  | SbpmMessageTransitionOptions
  | SbpmSendStateTransitionOptions
  | SbpmReceiveStateTransitionOptions
  | SbpmFunctionStateTransitionOptions;

type GetElementOptionsType<T> = T extends SbpmProcessNetwork | SbpmProcessNetworkType
  ? SbpmProcessNetworkOptions
  : T extends SbpmProcessModel | SbpmProcessModelType
  ? SbpmProcessModelOptions
  : T extends SbpmSubject | SbpmSubjectType
  ? SbpmSubjectOptions
  : T extends SbpmSendState | SbpmSendStateType
  ? SbpmSendStateOptions
  : T extends SbpmReceiveState | SbpmReceiveStateType
  ? SbpmReceiveStateOptions
  : T extends SbpmFunctionState | SbpmFunctionStateType
  ? SbpmFunctionStateOptions
  : SbpmElementOptionsCore;

export type GetSbpmElementOptions<T> = GetElementOptionsType<T>;

export type GetSbpmElementUpdateOptions<T> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T> = T extends SbpmProcessTransition | SbpmProcessTransitionType
  ? SbpmProcessTransitionOptions
  : T extends SbpmMessageTransition | SbpmMessageTransitionType
  ? SbpmMessageTransitionOptions
  : T extends SbpmSendStateTransition | SbpmSendStateTransitionType
  ? SbpmSendStateTransitionOptions
  : T extends SbpmReceiveStateTransition | SbpmReceiveStateTransitionType
  ? SbpmReceiveStateTransitionOptions
  : T extends SbpmFunctionStateTransition | SbpmFunctionStateTransitionType
  ? SbpmFunctionStateTransitionOptions
  : SbpmLinkOptionsCore;

export type GetSbpmLinkOptions<T> = GetLinkOptionsType<T>;

export type GetSbpmLinkUpdateOptions<T> = GetUpdateOptions<GetLinkOptionsType<T>>;

export type ElementTypeToElementClassMapping = {
  ProcessNetwork: SbpmProcessNetwork;
  ProcessModel: SbpmProcessModel;
  Subject: SbpmSubject;
  SendState: SbpmSendState;
  ReceiveState: SbpmReceiveState;
  FunctionState: SbpmFunctionState;
};

export type LinkTypeToLinkClassMapping = {
  ProcessTransition: SbpmProcessTransition;
  MessageTransition: SbpmMessageTransition;
  SendStateTransition: SbpmMessageTransition;
  ReceiveStateTransition: SbpmReceiveStateTransition;
  FunctionStateTransition: SbpmFunctionStateTransition;
};
