import type {
  GetUpdateOptions,
  SbpmProcessNetworkType,
  SbpmProcessModelType,
  SbpmMessageType,
  SbpmSubjectType,
  SbpmSendStateType,
  SbpmReceiveStateType,
  SbpmFunctionStateType,
  SbpmProcessTransitionType,
  SbpmMessageTransitionType,
  SbpmSendStateTransitionType,
  SbpmReceiveStateTransitionType,
  SbpmFunctionStateTransitionType,
  SbpmElementType,
  SbpmLinkType,
} from '../common';
import type { SbpmElementOptions as SbpmElementOptionsCore, SbpmLinkOptions as SbpmLinkOptionsCore } from '../core';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmProcessNetworkOptions } from './process-network';
import { SbpmProcessModel } from './process-model';
import type { SbpmProcessModelOptions } from './process-model';
import { SbpmMessage } from './message';
import type { SbpmMessageOptions } from './message';
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
import { SbpmFunctionStateTransition } from './function-state-transition';
import type { SbpmFunctionStateTransitionOptions } from './function-state-transition';
import { SbpmReceiveStateTransition } from './receive-state-transition';
import type { SbpmReceiveStateTransitionOptions } from './receive-state-transition';

export type SbpmElementOptions =
  | SbpmProcessNetworkOptions
  | SbpmProcessModelOptions
  | SbpmMessageOptions
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
  : T extends SbpmMessage | SbpmMessageType
  ? SbpmMessageOptions
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

export type SbpmElementViewItem<Type extends SbpmElementType = SbpmElementType> = {
  type: Type;
  options: GetSbpmElementOptions<Type>;
};

export type SbpmLinkViewItem<Type extends SbpmLinkType = SbpmLinkType> = {
  type: Type;
  options: GetSbpmLinkOptions<Type>;
};

export type SbpmViewItem<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType> =
  | SbpmElementViewItem<ElementType>
  | SbpmLinkViewItem<LinkType>;

export type SbpmView<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType> = SbpmViewItem<
  ElementType,
  LinkType
>[];
