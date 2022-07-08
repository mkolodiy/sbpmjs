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

export type SbpmShape<Type extends SbpmShapeType = SbpmShapeType> = {
  type: Type;
  id: string;
};

export type SbpmElement<Type extends SbpmElementType = SbpmElementType> = SbpmShape<Type> & {
  label: string;
  position: Coordinates;
};

export type SbpmLink<Type extends SbpmLinkType = SbpmLinkType> = SbpmShape<Type> & {
  source: Omit<SbpmShape, 'type'>;
  target: Omit<SbpmShape, 'type'>;
};

export type SbpmState<
  Type extends SbpmSendStateType | SbpmReceiveStateType | SbpmFunctionStateType = SbpmSendStateType | SbpmReceiveStateType | SbpmFunctionStateType
> = SbpmElement<Type> & {
  role?: 'start' | 'end' | 'none';
};

export type SbpmStateTransition<
  Type extends SbpmSendStateTransitionType | SbpmReceiveStateTransitionType | SbpmFunctionStateTransitionType =
    | SbpmSendStateTransitionType
    | SbpmReceiveStateTransitionType
    | SbpmFunctionStateTransitionType
> = SbpmLink<Type> & {
  subject?: string;
  message?: string;
};

export type SbpmProcessNetwork = SbpmElement<'ProcessNetwork'>;

export type SbpmProcessModel = SbpmElement<'ProcessModel'> & {
  role?: 'single' | 'multi';
};

export type SbpmMessage = SbpmElement<'Message'>;

export type SbpmSubject = SbpmElement<'Subject'> & {
  icon?: 'human' | 'machine';
};

export type SbpmSendState = SbpmState<'SendState'>;

export type SbpmReceiveState = SbpmState<'ReceiveState'>;

export type SbpmFunctionState = SbpmState<'FunctionState'>;

export type SbpmProcessTransition = SbpmLink<'ProcessTransition'>;

export type SbpmMessageTransition = SbpmLink<'MessageTransition'> & {
  role?: 'unidirectional' | 'bidirectional';
};

export type SbpmSendStateTransition = SbpmStateTransition<'SendStateTransition'>;

export type SbpmFunctionStateTransition = SbpmStateTransition<'ReceiveStateTransition'>;

export type SbpmReceiveStateTransition = Omit<SbpmStateTransition<'FunctionStateTransition'>, 'subject'>;

export function isSbpmLinkType(type: SbpmShapeType) {
  return type.includes('Transition');
}
