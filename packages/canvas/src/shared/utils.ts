import {
	type SbpmFunctionStateOptions,
	type SbpmFunctionStateType,
	sbpmFunctionStateType,
} from "../sbpm/function-state";
import {
	type SbpmFunctionStateTransitionOptions,
	type SbpmFunctionStateTransitionType,
	sbpmFunctionStateTransitionType,
} from "../sbpm/function-state-transition";
import {
	type SbpmMessageExchangeOptions,
	type SbpmMessageExchangeType,
	sbpmMessageExchangeType,
} from "../sbpm/message-exchange";
import {
	type SbpmMessageSpecificationOptions,
	type SbpmMessageSpecificationType,
	sbpmMessageSpecificationType,
} from "../sbpm/message-specification";
import {
	type SbpmMultiProcessModelOptions,
	type SbpmMultiProcessModelType,
	sbpmMultiProcessModelType,
} from "../sbpm/multi-process-model";
import {
	type SbpmProcessModelOptions,
	type SbpmProcessModelType,
	sbpmProcessModelType,
} from "../sbpm/process-model";
import {
	type SbpmProcessNetworkOptions,
	type SbpmProcessNetworkType,
	sbpmProcessNetworkType,
} from "../sbpm/process-network";
import {
	type SbpmProcessNetworkTransitionOptions,
	type SbpmProcessNetworkTransitionType,
	sbpmProcessNetworkTransitionType,
} from "../sbpm/process-network-transition";
import {
	type SbpmReceiveStateOptions,
	type SbpmReceiveStateType,
	sbpmReceiveStateType,
} from "../sbpm/receive-state";
import {
	type SbpmReceiveStateTransitionOptions,
	type SbpmReceiveStateTransitionType,
	sbpmReceiveStateTransitionType,
} from "../sbpm/receive-state-transition";
import {
	type SbpmSendStateOptions,
	type SbpmSendStateType,
	sbpmSendStateType,
} from "../sbpm/send-state";
import {
	type SbpmSendStateTransitionOptions,
	type SbpmSendStateTransitionType,
	sbpmSendStateTransitionType,
} from "../sbpm/send-state-transition";
import {
	type SbpmStandardSubjectOptions,
	type SbpmStandardSubjectType,
	sbpmStandardSubjectType,
} from "../sbpm/standard-subject";

export function createIcon(template: string): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(template)}`;
}

export function isLinkType(
	type: unknown,
): type is
	| SbpmFunctionStateTransitionType
	| SbpmMessageExchangeType
	| SbpmProcessNetworkTransitionType
	| SbpmReceiveStateTransitionType
	| SbpmSendStateTransitionType {
	return (
		typeof type === "string" &&
		(type === sbpmFunctionStateTransitionType ||
			type === sbpmMessageExchangeType ||
			type === sbpmProcessNetworkTransitionType ||
			type === sbpmReceiveStateTransitionType ||
			type === sbpmSendStateTransitionType)
	);
}

export function isElementType(
	type: unknown,
): type is
	| SbpmFunctionStateType
	| SbpmMessageSpecificationType
	| SbpmMultiProcessModelType
	| SbpmProcessModelType
	| SbpmProcessNetworkType
	| SbpmReceiveStateType
	| SbpmSendStateType
	| SbpmStandardSubjectType {
	return (
		typeof type === "string" &&
		(type === sbpmFunctionStateType ||
			type === sbpmMessageSpecificationType ||
			type === sbpmMultiProcessModelType ||
			type === sbpmProcessModelType ||
			type === sbpmProcessNetworkType ||
			type === sbpmReceiveStateType ||
			type === sbpmSendStateType ||
			type === sbpmStandardSubjectType)
	);
}

export function isValidItem(options: {
	type: unknown;
}): options is
	| SbpmFunctionStateTransitionOptions
	| SbpmFunctionStateOptions
	| SbpmMessageExchangeOptions
	| SbpmMessageSpecificationOptions
	| SbpmMultiProcessModelOptions
	| SbpmProcessModelOptions
	| SbpmProcessNetworkTransitionOptions
	| SbpmProcessNetworkOptions
	| SbpmReceiveStateTransitionOptions
	| SbpmReceiveStateOptions
	| SbpmSendStateTransitionOptions
	| SbpmSendStateOptions
	| SbpmStandardSubjectOptions {
	return (
		options.type === sbpmFunctionStateTransitionType ||
		options.type === sbpmFunctionStateType ||
		options.type === sbpmMessageExchangeType ||
		options.type === sbpmMessageSpecificationType ||
		options.type === sbpmMultiProcessModelType ||
		options.type === sbpmProcessModelType ||
		options.type === sbpmProcessNetworkTransitionType ||
		options.type === sbpmProcessNetworkType ||
		options.type === sbpmReceiveStateTransitionType ||
		options.type === sbpmReceiveStateType ||
		options.type === sbpmSendStateTransitionType ||
		options.type === sbpmSendStateType ||
		options.type === sbpmStandardSubjectType
	);
}
