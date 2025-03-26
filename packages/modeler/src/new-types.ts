export type SbpmItemId = string;

interface SbpmBaseItem<TType extends string = string> {
	id: SbpmItemId;
	type: TType;
	label: string;
}

interface SbpmContainerItem {
	contains: Array<SbpmItemId> | undefined;
}

interface SbpmCanvasItem {
	position: {
		x: number;
		y: number;
	};
}

export type SbpmProcessNetworkType = "sbpm.ProcessNetwork";
export interface SbpmProcessNetwork
	extends SbpmBaseItem<SbpmProcessNetworkType> {}
export function defineSbpmProcessNetwork(
	item: Omit<SbpmProcessNetwork, "type">,
): SbpmProcessNetwork {
	return {
		...item,
		type: "sbpm.ProcessNetwork",
	};
}

export type SbpmProcessNetworkTransitionType = "sbpm.ProcessNetworkTransition";
export interface SbpmProcessNetworkTransition
	extends SbpmBaseItem<SbpmProcessNetworkTransitionType> {}
export function defineSbpmProcessNetworkTransition(
	item: Omit<SbpmProcessNetworkTransition, "type">,
): SbpmProcessNetworkTransition {
	return {
		...item,
		type: "sbpm.ProcessNetworkTransition",
	};
}

export type SbpmSingleProcessModelType = "sbpm.SingleProcessModel";
export interface SbpmSingleProcessModel
	extends SbpmBaseItem<SbpmSingleProcessModelType>,
		SbpmContainerItem,
		SbpmCanvasItem {}

export function defineSbpmSingleProcessModel(
	item: Omit<SbpmSingleProcessModel, "type">,
): SbpmSingleProcessModel {
	return {
		...item,
		type: "sbpm.SingleProcessModel",
	};
}

export type SbpmStandardLayerType = "sbpm.StandardLayer";
export interface SbpmStandardLayer
	extends SbpmBaseItem<SbpmStandardLayerType>,
		SbpmContainerItem,
		SbpmCanvasItem {
	implements?: SbpmItemId;
	startSubject: SbpmItemId | undefined;
}

export function defineSbpmStandardLayer(
	item: Omit<SbpmStandardLayer, "type">,
): SbpmStandardLayer {
	return {
		...item,
		type: "sbpm.StandardLayer",
	};
}

export type SbpmStandardSubjectType = "sbpm.StandardSubject";
export interface SbpmStandardSubject
	extends SbpmBaseItem<SbpmStandardSubjectType>,
		SbpmCanvasItem {
	behavior: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export function defineSbpmStandardSubject(
	item: Omit<SbpmStandardSubject, "type">,
): SbpmStandardSubject {
	return {
		...item,
		type: "sbpm.StandardSubject",
	};
}

export type SbpmMessageSpecificationType = "sbpm.MessageSpecification";
export interface SbpmMessageSpecification
	extends SbpmBaseItem<SbpmMessageSpecificationType>,
		SbpmCanvasItem {}

export function defineSbpmMessageSpecification(
	item: Omit<SbpmMessageSpecification, "type">,
): SbpmMessageSpecification {
	return {
		...item,
		type: "sbpm.MessageSpecification",
	};
}

export type SbpmMessageExchangeTransitionType =
	"sbpm.MessageExchangeTransition";
export interface SbpmMessageExchangeTransition
	extends SbpmBaseItem<SbpmMessageExchangeTransitionType>,
		SbpmContainerItem {
	fromSubject: SbpmItemId;
	toSubject: SbpmItemId;
}

export function defineSbpmMessageExchangeTransition(
	item: Omit<SbpmMessageExchangeTransition, "type">,
): SbpmMessageExchangeTransition {
	return {
		...item,
		type: "sbpm.MessageExchangeTransition",
	};
}

export type SbpmStandardBehaviorType = "sbpm.StandardBehavior";
export interface SbpmStandardBehavior
	extends SbpmBaseItem<SbpmStandardBehaviorType>,
		SbpmContainerItem,
		SbpmCanvasItem {
	startState: SbpmItemId | undefined;
	endState: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export function defineSbpmStandardBehavior(
	item: Omit<SbpmStandardBehavior, "type">,
): SbpmStandardBehavior {
	return {
		...item,
		type: "sbpm.StandardBehavior",
	};
}

export interface SbpmState {
	startState?: boolean;
	endState?: boolean;
	references?: SbpmItemId;
}

export type SbpmFunctionStateType = "sbpm.FunctionState";
export interface SbpmFunctionState
	extends SbpmBaseItem<SbpmFunctionStateType>,
		SbpmState,
		SbpmContainerItem,
		SbpmCanvasItem {}

export function defineSbpmFunctionState(
	item: Omit<SbpmFunctionState, "type">,
): SbpmFunctionState {
	return {
		...item,
		type: "sbpm.FunctionState",
	};
}

export type SbpmSendStateType = "sbpm.SendState";
export interface SbpmSendState
	extends SbpmBaseItem<SbpmSendStateType>,
		SbpmState,
		SbpmContainerItem,
		SbpmCanvasItem {}

export function defineSbpmSendState(
	item: Omit<SbpmSendState, "type">,
): SbpmSendState {
	return {
		...item,
		type: "sbpm.SendState",
	};
}

export type SbpmReceiveStateType = "sbpm.ReceiveState";
export interface SbpmReceiveState
	extends SbpmBaseItem<SbpmReceiveStateType>,
		SbpmState,
		SbpmContainerItem,
		SbpmCanvasItem {}

export function defineSbpmReceiveState(
	item: Omit<SbpmReceiveState, "type">,
): SbpmReceiveState {
	return {
		...item,
		type: "sbpm.ReceiveState",
	};
}

export interface SbpmStateTransition {
	fromState: SbpmItemId;
	toState: SbpmItemId;
	priority?: number;
}

export type SbpmFunctionStateTransitionType = "sbpm.FunctionStateTransition";
export interface SbpmFunctionStateTransition
	extends SbpmBaseItem<SbpmFunctionStateTransitionType>,
		SbpmStateTransition,
		SbpmContainerItem {}

export function defineSbpmFunctionStateTransition(
	item: Omit<SbpmFunctionStateTransition, "type">,
): SbpmFunctionStateTransition {
	return {
		...item,
		type: "sbpm.FunctionStateTransition",
	};
}

export type SbpmSendStateTransitionType = "sbpm.SendStateTransition";
export interface SbpmSendStateTransition
	extends SbpmBaseItem<SbpmSendStateTransitionType>,
		SbpmStateTransition,
		SbpmContainerItem {
	receiverSubject: SbpmItemId | undefined;
	message: SbpmItemId | undefined;
}

export function defineSbpmSendStateTransition(
	item: Omit<SbpmSendStateTransition, "type">,
): SbpmSendStateTransition {
	return {
		...item,
		type: "sbpm.SendStateTransition",
	};
}

export type SbpmReceiveStateTransitionType = "sbpm.ReceiveStateTransition";
export interface SbpmReceiveStateTransition
	extends SbpmBaseItem<SbpmReceiveStateTransitionType>,
		SbpmStateTransition,
		SbpmContainerItem {
	senderSubject: SbpmItemId | undefined;
	message: SbpmItemId | undefined;
}

export function defineSbpmReceiveStateTransition(
	item: Omit<SbpmReceiveStateTransition, "type">,
): SbpmReceiveStateTransition {
	return {
		...item,
		type: "sbpm.ReceiveStateTransition",
	};
}

export type SbpmItem =
	| SbpmProcessNetwork
	| SbpmProcessNetworkTransition
	| SbpmSingleProcessModel
	| SbpmStandardLayer
	| SbpmStandardSubject
	| SbpmMessageSpecification
	| SbpmMessageExchangeTransition
	| SbpmStandardBehavior
	| SbpmFunctionState
	| SbpmSendState
	| SbpmReceiveState
	| SbpmFunctionStateTransition
	| SbpmSendStateTransition
	| SbpmReceiveStateTransition;

export function defineSbpmItems(items: Array<SbpmItem>): Array<SbpmItem> {
	return items;
}
