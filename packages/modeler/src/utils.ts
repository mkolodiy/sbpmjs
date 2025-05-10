import {
	type SbpmFunctionStateOptions,
	type SbpmFunctionStateType,
	type SbpmMessageExchangeOptions,
	type SbpmMessageSpecificationOptions,
	type SbpmMessageSpecificationType,
	type SbpmMultiProcessModelOptions,
	type SbpmMultiProcessModelType,
	type SbpmProcessModelOptions,
	type SbpmProcessModelType,
	type SbpmProcessNetworkOptions,
	type SbpmProcessNetworkType,
	type SbpmReceiveStateOptions,
	type SbpmReceiveStateType,
	type SbpmSendStateOptions,
	type SbpmSendStateType,
	type SbpmStandardBehaviorOptions,
	type SbpmStandardBehaviorType,
	type SbpmStandardLayerOptions,
	type SbpmStandardLayerType,
	type SbpmStandardSubjectOptions,
	type SbpmStandardSubjectType,
	sbpmMessageExchangeType,
	sbpmMultiProcessModelType,
	sbpmProcessModelType,
	sbpmStandardBehaviorType,
	sbpmStandardLayerType,
	sbpmStandardSubjectType,
} from "@sbpmjs/canvas";
import {
	type SbpmProcessOptions,
	type SbpmProcessType,
	sbpmProcessType,
} from "./types";

export function isContainerItem(
	item: unknown,
): item is
	| SbpmProcessOptions
	| SbpmMessageExchangeOptions
	| SbpmMultiProcessModelOptions
	| SbpmProcessModelOptions
	| SbpmStandardBehaviorOptions
	| SbpmStandardLayerOptions
	| SbpmStandardSubjectOptions {
	return (
		typeof item === "object" &&
		item !== null &&
		"contains" in item &&
		"type" in item &&
		(item.type === sbpmProcessType ||
			item.type === sbpmMessageExchangeType ||
			item.type === sbpmMultiProcessModelType ||
			item.type === sbpmProcessModelType ||
			item.type === sbpmStandardBehaviorType ||
			item.type === sbpmStandardLayerType ||
			item.type === sbpmStandardSubjectType)
	);
}

type ElementOptions<
	TType extends
		| SbpmProcessType
		| SbpmFunctionStateType
		| SbpmMessageSpecificationType
		| SbpmMultiProcessModelType
		| SbpmProcessModelType
		| SbpmProcessNetworkType
		| SbpmReceiveStateType
		| SbpmSendStateType
		| SbpmStandardBehaviorType
		| SbpmStandardLayerType
		| SbpmStandardSubjectType,
> = TType extends SbpmProcessType
	? SbpmProcessOptions
	: TType extends SbpmFunctionStateType
		? SbpmFunctionStateOptions
		: TType extends SbpmMessageSpecificationType
			? SbpmMessageSpecificationOptions
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
								: TType extends SbpmStandardBehaviorType
									? SbpmStandardBehaviorOptions
									: TType extends SbpmStandardLayerType
										? SbpmStandardLayerOptions
										: TType extends SbpmStandardSubjectType
											? SbpmStandardSubjectOptions
											: unknown;

export function getDefaultElementOptions<
	TType extends
		| SbpmProcessType
		| SbpmFunctionStateType
		| SbpmMessageSpecificationType
		| SbpmMultiProcessModelType
		| SbpmProcessModelType
		| SbpmProcessNetworkType
		| SbpmReceiveStateType
		| SbpmSendStateType
		| SbpmStandardSubjectType
		| SbpmStandardBehaviorType
		| SbpmStandardLayerType,
>(type: TType): ElementOptions<TType> {
	switch (type) {
		case "sbpm.Process":
			return {
				type: "sbpm.Process",
				id: crypto.randomUUID(),
				label: "Default process",
				contains: [],
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
		case "sbpm.ProcessNetwork":
			return {
				type: "sbpm.ProcessNetwork",
				id: crypto.randomUUID(),
				label: "Default process network",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.StandardSubject":
			return {
				type: "sbpm.StandardSubject",
				id: crypto.randomUUID(),
				label: "Default subject",
				position: { x: 0, y: 0 },
				contains: [],
			} as ElementOptions<TType>;
		case "sbpm.ReceiveState":
			return {
				type: "sbpm.ReceiveState",
				id: crypto.randomUUID(),
				label: "Default receive state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.SendState":
			return {
				type: "sbpm.SendState",
				id: crypto.randomUUID(),
				label: "Default send state",
				position: { x: 0, y: 0 },
			} as ElementOptions<TType>;
		case "sbpm.StandardBehavior":
			return {
				type: "sbpm.StandardBehavior",
				id: crypto.randomUUID(),
				label: "Default standard behavior",
				position: { x: 0, y: 0 },
				contains: [],
			} as ElementOptions<TType>;
		case "sbpm.StandardLayer":
			return {
				type: "sbpm.StandardLayer",
				id: crypto.randomUUID(),
				label: "Default standard layer",
				position: { x: 0, y: 0 },
				contains: [],
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
