import {
	type SbpmFunctionStateOptions,
	SbpmFunctionStateType,
	type SbpmMessageOptions,
	type SbpmMessageTransitionOptions,
	SbpmMessageTransitionType,
	SbpmMessageType,
	type SbpmProcessModelOptions,
	SbpmProcessModelType,
	type SbpmProcessNetworkOptions,
	SbpmProcessNetworkType,
	type SbpmReceiveStateOptions,
	SbpmReceiveStateType,
	type SbpmSendStateOptions,
	SbpmSendStateType,
	type SbpmSubjectOptions,
	SbpmSubjectType,
} from "@sbpmjs/canvas";
import { type SbpmProcessOptions, SbpmProcessType } from "./types";

export function isContainerItem(
	item: unknown,
): item is
	| SbpmProcessOptions
	| SbpmProcessModelOptions
	| SbpmSubjectOptions
	| SbpmMessageTransitionOptions {
	return (
		typeof item === "object" &&
		item !== null &&
		"contains" in item &&
		"type" in item &&
		(item.type === SbpmProcessType ||
			item.type === SbpmProcessModelType ||
			item.type === SbpmSubjectType ||
			item.type === SbpmMessageTransitionType)
	);
}

export function isValidSbpmElementType(
	type: unknown,
): type is
	| typeof SbpmProcessType
	| typeof SbpmProcessNetworkType
	| typeof SbpmProcessModelType
	| typeof SbpmSubjectType
	| typeof SbpmSendStateType
	| typeof SbpmReceiveStateType
	| typeof SbpmFunctionStateType
	| typeof SbpmMessageType {
	return (
		type === SbpmProcessType ||
		type === SbpmProcessNetworkType ||
		type === SbpmProcessModelType ||
		type === SbpmSubjectType ||
		type === SbpmSendStateType ||
		type === SbpmReceiveStateType ||
		type === SbpmFunctionStateType ||
		type === SbpmMessageType
	);
}

type ElementOptions<
	TType extends
		| typeof SbpmProcessType
		| typeof SbpmProcessNetworkType
		| typeof SbpmProcessModelType
		| typeof SbpmSubjectType
		| typeof SbpmSendStateType
		| typeof SbpmReceiveStateType
		| typeof SbpmFunctionStateType
		| typeof SbpmMessageType,
> = TType extends typeof SbpmProcessType
	? SbpmProcessOptions
	: TType extends typeof SbpmFunctionStateType
		? SbpmFunctionStateOptions
		: TType extends typeof SbpmProcessModelType
			? SbpmProcessModelOptions
			: TType extends typeof SbpmProcessNetworkType
				? SbpmProcessNetworkOptions
				: TType extends typeof SbpmReceiveStateType
					? SbpmReceiveStateOptions
					: TType extends typeof SbpmSendStateType
						? SbpmSendStateOptions
						: TType extends typeof SbpmSubjectType
							? SbpmSubjectOptions
							: TType extends typeof SbpmMessageType
								? SbpmMessageOptions
								: unknown;

export function getDefaultElementOptions<
	TType extends
		| typeof SbpmProcessType
		| typeof SbpmProcessNetworkType
		| typeof SbpmProcessModelType
		| typeof SbpmSubjectType
		| typeof SbpmSendStateType
		| typeof SbpmReceiveStateType
		| typeof SbpmFunctionStateType
		| typeof SbpmMessageType,
>(type: TType): ElementOptions<TType> {
	switch (type) {
		case SbpmProcessType:
			return {
				type: "sbpm.pnd.SbpmProcess",
				id: crypto.randomUUID(),
				label: "Default process",
				contains: [],
			} as ElementOptions<TType>;
		case SbpmProcessNetworkType:
			return {
				type: "sbpm.pnd.SbpmProcessNetwork",
				id: crypto.randomUUID(),
				label: "Default process network",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case SbpmProcessModelType:
			return {
				type: "sbpm.pnd.SbpmProcessModel",
				id: crypto.randomUUID(),
				label: "Default process model",
				position: { x: 0, y: 0 },
				contains: [],
				customData: { a: "a" },
			} as ElementOptions<TType>;
		case SbpmSubjectType:
			return {
				type: "sbpm.sid.SbpmSubject",
				id: crypto.randomUUID(),
				label: "Default subject",
				position: { x: 0, y: 0 },
				contains: [],
			} as ElementOptions<TType>;
		case SbpmSendStateType:
			return {
				type: "sbpm.sbd.SbpmSendState",
				id: crypto.randomUUID(),
				label: "Default send state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case SbpmReceiveStateType:
			return {
				type: "sbpm.sbd.SbpmReceiveState",
				id: crypto.randomUUID(),
				label: "Default receive state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case SbpmFunctionStateType:
			return {
				type: "sbpm.sbd.SbpmFunctionState",
				id: crypto.randomUUID(),
				label: "Default function state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case SbpmMessageType:
			return {
				type: "sbpm.pnd.SbpmMessage",
				id: crypto.randomUUID(),
				label: "Default message",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		default:
			throw new Error("Invalid type.");
	}
}

export function isString(value: unknown): value is string {
	return typeof value === "string";
}

