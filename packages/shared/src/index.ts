export type Coordinates = {
  x: number;
  y: number;
};

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

export type SbpmBasicShape = {
  id: string;
};

export type SbpmContainerShape = {
  contains?: SbpmBasicShape[];
};

export type SbpmElement = SbpmBasicShape & {
  label: string;
  position: Coordinates;
};

export type SbpmLink = SbpmBasicShape & {
  source: SbpmBasicShape;
  target: SbpmBasicShape;
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

export type SbpmElementItem<Type extends SbpmElementType = SbpmElementType> = {
  type: Type;
  item: GetSbpmElement<Type>;
};

export type SbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType> = {
  type: Type;
  item: GetSbpmLink<Type>;
};

export type SbpmProcessItem<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType> =
  | SbpmElementItem<ElementType>
  | SbpmLinkItem<LinkType>;

export type SbpmProcess<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType> = SbpmProcessItem<
  ElementType,
  LinkType
>[];

export function constructSbpmElementItem<Type extends SbpmElementType = SbpmElementType>(item: SbpmElementItem<Type>) {
  return item;
}

export function constructSbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType>(item: SbpmLinkItem<Type>) {
  return item;
}

export function constructSbpmProcessItem<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType>(
  item: SbpmProcessItem<ElementType, LinkType>
) {
  return item;
}

export function constructSbpmProcess<ElementType extends SbpmElementType = SbpmElementType, LinkType extends SbpmLinkType = SbpmLinkType>(
  item: SbpmProcess<ElementType, LinkType>
) {
  return item;
}

export function isSbpmLinkType(type: SbpmShapeType) {
  return type.includes('Transition');
}
