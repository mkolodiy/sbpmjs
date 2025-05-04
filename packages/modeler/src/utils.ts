import {
	type SbpmProcessModelOptions,
	sbpmProcessModelType,
	type SbpmFunctionStateOptions,
	type SbpmProcessNetworkOptions,
	type SbpmReceiveStateOptions,
	type SbpmSendStateOptions,
	type SbpmMessageExchangeOptions,
	sbpmMessageExchangeType,
	type SbpmMultiProcessModelOptions,
	sbpmMultiProcessModelType,
	type SbpmProcessNetworkType,
	type SbpmProcessModelType,
	type SbpmStandardSubjectType,
	type SbpmSendStateType,
	type SbpmReceiveStateType,
	type SbpmFunctionStateType,
	type SbpmMessageSpecificationType,
	type SbpmStandardSubjectOptions,
	type SbpmMessageSpecificationOptions,
	type SbpmMultiProcessModelType,
} from "@sbpmjs/canvas";
import {
	type SbpmProcessOptions,
	type SbpmProcessType,
	sbpmProcessType,
	type SbpmStandardBehaviorOptions,
	sbpmStandardBehaviorType,
} from "./types";

export function isContainerItem(
	item: unknown,
): item is
	| SbpmProcessOptions
	| SbpmMultiProcessModelOptions
	| SbpmProcessModelOptions
	| SbpmStandardBehaviorOptions
	| SbpmMessageExchangeOptions {
	return (
		typeof item === "object" &&
		item !== null &&
		"contains" in item &&
		"type" in item &&
		(item.type === sbpmMultiProcessModelType ||
			item.type === sbpmProcessType ||
			item.type === sbpmProcessModelType ||
			item.type === sbpmStandardBehaviorType ||
			item.type === sbpmMessageExchangeType)
	);
}

type ElementOptions<
	TType extends
		| SbpmProcessType
		| SbpmProcessNetworkType
		| SbpmMultiProcessModelType
		| SbpmProcessModelType
		| SbpmStandardSubjectType
		| SbpmSendStateType
		| SbpmReceiveStateType
		| SbpmFunctionStateType
		| SbpmMessageSpecificationType,
> = TType extends SbpmProcessType
	? SbpmProcessOptions
	: TType extends SbpmFunctionStateType
		? SbpmFunctionStateOptions
		: TType extends SbpmMultiProcessModelType
			? SbpmMultiProcessModelOptions
			: TType extends SbpmProcessModelType
				? SbpmProcessModelOptions
				: TType extends SbpmProcessNetworkType
					? SbpmProcessNetworkOptions
					: TType extends SbpmReceiveStateType
						? SbpmReceiveStateOptions
						: TType extends SbpmSendStateType
							? SbpmSendStateOptions
							: TType extends SbpmStandardSubjectType
								? SbpmStandardSubjectOptions
								: TType extends SbpmMessageSpecificationType
									? SbpmMessageSpecificationOptions
									: unknown;

export function getDefaultElementOptions<
	TType extends
		| SbpmProcessType
		| SbpmProcessNetworkType
		| SbpmMultiProcessModelType
		| SbpmProcessModelType
		| SbpmStandardSubjectType
		| SbpmSendStateType
		| SbpmReceiveStateType
		| SbpmFunctionStateType
		| SbpmMessageSpecificationType,
>(type: TType): ElementOptions<TType> {
	switch (type) {
		case "sbpm.Process":
			return {
				type: "sbpm.Process",
				id: crypto.randomUUID(),
				label: "Default process",
				contains: [],
			} as ElementOptions<TType>;
		case "sbpm.ProcessNetwork":
			return {
				type: "sbpm.ProcessNetwork",
				id: crypto.randomUUID(),
				label: "Default process network",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.ProcessModel":
			return {
				type: "sbpm.ProcessModel",
				id: crypto.randomUUID(),
				label: "Default process model",
				position: { x: 0, y: 0 },
				contains: [],
				customData: { a: "a" },
			} as ElementOptions<TType>;
		case "sbpm.MultiProcessModel":
			return {
				type: "sbpm.MultiProcessModel",
				id: crypto.randomUUID(),
				label: "Default process model",
				position: { x: 0, y: 0 },
				contains: [],
				customData: { a: "a" },
			} as ElementOptions<TType>;
		case "sbpm.StandardSubject":
			return {
				type: "sbpm.StandardSubject",
				id: crypto.randomUUID(),
				label: "Default subject",
				position: { x: 0, y: 0 },
				contains: [],
			} as ElementOptions<TType>;
		case "sbpm.SendState":
			return {
				type: "sbpm.SendState",
				id: crypto.randomUUID(),
				label: "Default send state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.ReceiveState":
			return {
				type: "sbpm.ReceiveState",
				id: crypto.randomUUID(),
				label: "Default receive state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.FunctionState":
			return {
				type: "sbpm.FunctionState",
				id: crypto.randomUUID(),
				label: "Default function state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.MessageSpecification":
			return {
				type: "sbpm.MessageSpecification",
				id: crypto.randomUUID(),
				label: "Default message",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		default:
			throw new Error("Invalid type.");
	}
}

// export function isString(value: unknown): value is string {
// 	return typeof value === "string";
// }

// export function isElementShell(
// 	element: unknown,
// ): element is { id: SbpmItemId; label: SbpmItemId } {
// 	return (
// 		typeof element !== "string" &&
// 		typeof element === "object" &&
// 		element !== null &&
// 		"id" in element &&
// 		"label" in element
// 	);
// }
