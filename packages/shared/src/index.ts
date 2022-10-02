export type Coordinates = {
  x: number;
  y: number;
};

export type SbpmProcessType = 'Process';

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

export type SbpmGeneralEntityType = SbpmProcessType;

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

export type SbpmShapeType = SbpmElementType | SbpmLinkType;

export type SbpmType = SbpmGeneralEntityType | SbpmShapeType;

export type SbpmBasicShape = {
  id: string;
  label: string;
};

export type SbpmContainerShape = {
  contains?: string[];
};

export type SbpmProcess = SbpmBasicShape & Required<SbpmContainerShape>;

export type SbpmElement = SbpmBasicShape & {
  position: Coordinates;
};

export type SbpmLink = SbpmBasicShape & {
  source: string;
  target: string;
};

export type SbpmState = SbpmElement & {
  role?: 'start' | 'end' | 'none';
};

export type SbpmStateTransition = SbpmLink & {
  subject?: string;
  message?: string;
};

export type SbpmProcessNetwork = SbpmElement;

export type SbpmProcessModel = SbpmElement &
  SbpmContainerShape & {
    role?: 'single' | 'multi';
  };

export type SbpmMessage = SbpmElement;

export type SbpmSubject = SbpmElement &
  SbpmContainerShape & {
    representation?: 'human' | 'machine';
  };

export type SbpmSendState = SbpmState;

export type SbpmReceiveState = SbpmState;

export type SbpmFunctionState = SbpmState;

export type SbpmProcessTransition = SbpmLink;

export type SbpmMessageTransition = SbpmLink &
  SbpmContainerShape & {
    role?: 'unidirectional' | 'bidirectional';
  };

export type SbpmSendStateTransition = SbpmStateTransition;

export type SbpmReceiveStateTransition = SbpmStateTransition;

export type SbpmFunctionStateTransition = Omit<SbpmStateTransition, 'subject'>;

export type GetSbpmSbpmGeneralEntity<Type extends SbpmGeneralEntityType = SbpmGeneralEntityType> = Type extends SbpmProcessType ? SbpmProcess : undefined;

export type GetSbpmElement<Type extends SbpmElementType = SbpmElementType> = Type extends SbpmProcessNetworkType
  ? SbpmProcessNetwork
  : Type extends SbpmProcessModelType
  ? SbpmProcessModel
  : Type extends SbpmMessageType
  ? SbpmMessage
  : Type extends SbpmSubjectType
  ? SbpmSubject
  : Type extends SbpmSendStateType
  ? SbpmSendState
  : Type extends SbpmReceiveStateType
  ? SbpmReceiveState
  : Type extends SbpmFunctionStateType
  ? SbpmFunctionState
  : undefined;

export type GetSbpmLink<Type extends SbpmLinkType = SbpmLinkType> = Type extends SbpmProcessTransitionType
  ? SbpmProcessTransition
  : Type extends SbpmMessageTransitionType
  ? SbpmMessageTransition
  : Type extends SbpmFunctionStateTransitionType
  ? SbpmFunctionStateTransition
  : Type extends SbpmSendStateTransitionType
  ? SbpmSendStateTransition
  : Type extends SbpmReceiveStateTransitionType
  ? SbpmReceiveStateTransition
  : undefined;

export type SbpmGeneralEntityItem<Type extends SbpmGeneralEntityType = SbpmGeneralEntityType> = {
  type: Type;
  properties: GetSbpmSbpmGeneralEntity<Type>;
};

export type SbpmElementItem<Type extends SbpmElementType = SbpmElementType> = {
  type: Type;
  properties: GetSbpmElement<Type>;
};

export type SbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType> = {
  type: Type;
  properties: GetSbpmLink<Type>;
};

export type SbpmProcessItem<T> = T extends SbpmGeneralEntityType
  ? SbpmGeneralEntityItem<T>
  : T extends SbpmElementType
  ? SbpmElementItem<T>
  : T extends SbpmLinkType
  ? SbpmLinkItem<T>
  : undefined;

export type SbpmProcessItemGroup<T> = SbpmProcessItem<T>[];

export function createSbpmGeneralEntityItem<Type extends SbpmGeneralEntityType = SbpmGeneralEntityType>(item: SbpmGeneralEntityItem<Type>) {
  return item;
}

export function createSbpmElementItem<Type extends SbpmElementType = SbpmElementType>(item: SbpmElementItem<Type>) {
  return item;
}

export function createSbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType>(item: SbpmLinkItem<Type>) {
  return item;
}

export function createSbpmProcessItem<T>(item: SbpmProcessItem<T>) {
  return item;
}

export function createSbpmProcessItemGroup<T>(item: SbpmProcessItemGroup<T>) {
  return item;
}

export function isSbpmLinkType(type: SbpmType) {
  return type.includes('Transition');
}
