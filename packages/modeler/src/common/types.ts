import { SbpmShapeNamespace } from './constants';

export type ValueOf<T> = T[keyof T];

export interface GenericOptions {
  [key: string]: unknown;
}

export type SbpmShapeAttributes<T> = {
  toolsOptions: T;
};

export type SbpmOriginType = 'Origin';

export type SbpmProcessNetworkType = 'ProcessNetwork';

export type SbpmProcessModelType = 'ProcessModel';

export type SbpmSubjectType = 'Subject';

export type SbpmSendStateType = 'SendState';

export type SbpmReceiveStateType = 'ReceiveState';

export type SbpmFunctionStateType = 'FunctionState';

export type SbpmProcessTransitionType = 'ProcessTransition';

export type SbpmMessageTransitionType = 'MessageTransition';

export type SbpmFunctionStateTransitionType = 'FunctionStateTransition';

export type SbpmSendStateTransitionType = 'SendStateTransition';

export type SbpmReceiveStateTransitionType = 'ReceiveStateTransition';

export type SbpmCommonType = SbpmOriginType;

export type SbpmElementType =
  | SbpmProcessNetworkType
  | SbpmProcessModelType
  | SbpmSubjectType
  | SbpmSendStateType
  | SbpmReceiveStateType
  | SbpmFunctionStateType;

export type SbpmLinkType =
  | SbpmProcessTransitionType
  | SbpmMessageTransitionType
  | SbpmFunctionStateTransitionType
  | SbpmSendStateTransitionType
  | SbpmReceiveStateTransitionType;

export type SbpmShapeType = SbpmCommonType | SbpmElementType | SbpmLinkType;

export type SbpmShapeNamespaceType = ValueOf<typeof SbpmShapeNamespace>;

export type SbpmShapeOptions = {
  id?: string;
};

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;

export type Typed<T> = {
  type: T;
};
