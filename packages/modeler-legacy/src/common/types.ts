import type { SbpmItemNamespace } from "./constants";

export type ValueOf<T> = T[keyof T];

export interface GenericOptions {
	[key: string]: unknown;
}

export type SbpmItemAttributes<T> = {
	toolsOptions: T;
};

export type SbpmOriginType = "Origin";

export type SbpmItemNamespaceType = ValueOf<typeof SbpmItemNamespace>;

export type GetUpdateOptions<T> = Partial<Omit<T, "id">>;

export type Coordinates = {
	x: number;
	y: number;
};

export type SbpmProcessNetworkType = "ProcessNetwork";

export type SbpmProcessModelType = "ProcessModel";

export type SbpmMessageType = "Message";

export type SbpmSubjectType = "Subject";

export type SbpmSendStateType = "SendState";

export type SbpmReceiveStateType = "ReceiveState";

export type SbpmFunctionStateType = "FunctionState";

export type SbpmProcessTransitionType = "ProcessTransition";

export type SbpmMessageTransitionType = "MessageTransition";

export type SbpmFunctionStateTransitionType = "FunctionStateTransition";

export type SbpmSendStateTransitionType = "SendStateTransition";

export type SbpmReceiveStateTransitionType = "ReceiveStateTransition";

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

export type SbpmItemType = SbpmElementType | SbpmLinkType;

export interface SbpmBasicItem {
	id: string;
	label: string;
}

export interface SbpmElement extends SbpmBasicItem {
	position: Coordinates;
}

export interface SbpmLink extends SbpmBasicItem {
	source: string;
	target: string;
}

export interface SbpmState extends SbpmElement {
	role: "start" | "end" | "none";
}

export interface SbpmStateTransition extends Omit<SbpmLink, "label"> {
	subject: string;
	message: string;
}

export interface SbpmProcessNetwork extends SbpmElement {}

export interface SbpmProcessModel extends SbpmElement {
	role: "single" | "multi";
}

export interface SbpmMessage extends SbpmElement {}

export interface SbpmSubject extends SbpmElement {
	representation: "human" | "machine";
}

export interface SbpmSendState extends SbpmState {}

export interface SbpmReceiveState extends SbpmState {}

export interface SbpmFunctionState extends SbpmState {}

export interface SbpmProcessTransition extends Omit<SbpmLink, "label"> {}

export interface SbpmMessageTransition extends SbpmLink {
	role: "unidirectional" | "bidirectional";
}

export interface SbpmSendStateTransition extends SbpmStateTransition {}

export interface SbpmReceiveStateTransition extends SbpmStateTransition {}

export interface SbpmFunctionStateTransition
	extends Omit<SbpmStateTransition, "subject"> {}

export type GetSbpmElement<Type extends SbpmElementType = SbpmElementType> =
	Type extends SbpmProcessNetworkType
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

export type GetSbpmLink<Type extends SbpmLinkType = SbpmLinkType> =
	Type extends SbpmProcessTransitionType
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

export interface SbpmElementItem<
	Type extends SbpmElementType = SbpmElementType,
> {
	type: Type;
	properties: GetSbpmElement<Type>;
}

export interface SbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType> {
	type: Type;
	properties: GetSbpmLink<Type>;
}

export type SbpmItem<Type extends SbpmItemType = SbpmItemType> =
	Type extends SbpmElementType
		? SbpmElementItem<Type>
		: Type extends SbpmLinkType
			? SbpmLinkItem<Type>
			: undefined;

export type SbpmItemGroup<Type extends SbpmItemType = SbpmItemType> = Array<
	SbpmItem<Type>
>;

export function createSbpmElementItem<
	Type extends SbpmElementType = SbpmElementType,
>(item: SbpmElementItem<Type>) {
	return item;
}

export function createSbpmLinkItem<Type extends SbpmLinkType = SbpmLinkType>(
	item: SbpmLinkItem<Type>,
) {
	return item;
}

export function createSbpmItem<Type extends SbpmItemType = SbpmItemType>(
	item: SbpmItem<Type>,
) {
	return item;
}

export function createSbpmItemGroup<Type extends SbpmItemType = SbpmItemType>(
	item: SbpmItemGroup<Type>,
) {
	return item;
}
