export type SbpmItemId = string;

export interface SbpmItemPosition {
	x: number;
	y: number;
}

export interface SbpmBaseItem<TType extends string = string> {
	id: SbpmItemId;
	type: TType;
	label: string;
}

export interface SbpmContainerItem {
	contains: Array<SbpmItemId> | undefined;
}

export interface SbpmBaseElement<TType extends string = string>
	extends SbpmBaseItem<TType> {
	position: SbpmItemPosition;
}

export interface SbpmBaseLink<TType extends string = string>
	extends SbpmBaseItem<TType> {
	fromElement: SbpmItemId;
	toElement: SbpmItemId;
	vertices?: Array<SbpmItemPosition>;
}

export type SbpmProcessNetworkType = "sbpm.ProcessNetwork";
export interface SbpmProcessNetwork
	extends SbpmBaseElement<SbpmProcessNetworkType> {}

export type SbpmProcessNetworkTransitionType = "sbpm.ProcessNetworkTransition";
export interface SbpmProcessNetworkTransition
	extends SbpmBaseLink<SbpmProcessNetworkTransitionType> {}

export type SbpmProcessModelType = "sbpm.ProcessModel";
export interface SbpmProcessModel
	extends SbpmBaseElement<SbpmProcessModelType>,
		SbpmContainerItem {}

export type SbpmMultiProcessModelType = "sbpm.MultiProcessModel";
export interface SbpmMultiProcessModel
	extends SbpmBaseElement<SbpmMultiProcessModelType>,
		SbpmContainerItem {}

export type SbpmStandardLayerType = "sbpm.StandardLayer";
export interface SbpmStandardLayer
	extends SbpmBaseElement<SbpmStandardLayerType>,
		SbpmContainerItem {
	implements?: SbpmItemId;
	startSubject: SbpmItemId | undefined;
}

export type SbpmStandardSubjectType = "sbpm.StandardSubject";
export interface SbpmStandardSubject
	extends SbpmBaseElement<SbpmStandardSubjectType> {
	behavior: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export type SbpmMessageSpecificationType = "sbpm.MessageSpecification";
export interface SbpmMessageSpecification
	extends SbpmBaseElement<SbpmMessageSpecificationType> {}

export type SbpmMessageExchangeType = "sbpm.MessageExchange";
export interface SbpmMessageExchange
	extends SbpmBaseLink<SbpmMessageExchangeType>,
		SbpmContainerItem {}

export type SbpmStandardBehaviorType = "sbpm.StandardBehavior";
export interface SbpmStandardBehavior
	extends SbpmBaseElement<SbpmStandardBehaviorType>,
		SbpmContainerItem {
	startState: SbpmItemId | undefined;
	endState: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export interface SbpmBaseState<TType extends string = string>
	extends SbpmBaseElement<TType> {
	role?: "start" | "end";
	references?: SbpmItemId;
}

export type SbpmFunctionStateType = "sbpm.FunctionState";
export interface SbpmFunctionState
	extends SbpmBaseState<SbpmFunctionStateType> {}

export type SbpmSendStateType = "sbpm.SendState";
export interface SbpmSendState extends SbpmBaseState<SbpmSendStateType> {}

export type SbpmReceiveStateType = "sbpm.ReceiveState";
export interface SbpmReceiveState extends SbpmBaseState<SbpmReceiveStateType> {}

export interface SbpmBaseStateTransition<TType extends string = string>
	extends SbpmBaseLink<TType> {
	priority?: number;
}

export type SbpmFunctionStateTransitionType = "sbpm.FunctionStateTransition";
export interface SbpmFunctionStateTransition
	extends SbpmBaseStateTransition<SbpmFunctionStateTransitionType> {}

export type SbpmSendStateTransitionType = "sbpm.SendStateTransition";
export interface SbpmSendStateTransition
	extends SbpmBaseStateTransition<SbpmSendStateTransitionType> {
	receiverSubject: SbpmItemId | undefined;
	message: SbpmItemId | undefined;
}

export type SbpmReceiveStateTransitionType = "sbpm.ReceiveStateTransition";
export interface SbpmReceiveStateTransition
	extends SbpmBaseStateTransition<SbpmReceiveStateTransitionType> {
	senderSubject: SbpmItemId | undefined;
	message: SbpmItemId | undefined;
}
