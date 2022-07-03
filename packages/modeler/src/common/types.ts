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

export type SbpmMessageType = 'Message';

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
  | SbpmMessageType
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
  /**
   * A custom id to be used by jointjs graph. If not provided jointjs graph will generate one automatically.
   */
  id?: string;
};

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;
