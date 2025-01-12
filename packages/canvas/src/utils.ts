import {
	type SbpmFunctionStateOptions,
	SbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	type SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import {
	type SbpmMessageTransitionOptions,
	SbpmMessageTransitionType,
} from "./sbpm/message-transition";
import {
	type SbpmProcessModelOptions,
	SbpmProcessModelType,
} from "./sbpm/process-model";
import {
	type SbpmProcessNetworkOptions,
	SbpmProcessNetworkType,
} from "./sbpm/process-network";
import {
	type SbpmProcessTransitionOptions,
	SbpmProcessTransitionType,
} from "./sbpm/process-transition";
import {
	type SbpmReceiveStateOptions,
	SbpmReceiveStateType,
} from "./sbpm/receive-state";
import {
	type SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateTransitionType,
} from "./sbpm/receive-state-transition";
import {
	type SbpmSendStateOptions,
	SbpmSendStateType,
} from "./sbpm/send-state";
import {
	type SbpmSendStateTransitionOptions,
	SbpmSendStateTransitionType,
} from "./sbpm/send-state-transition";
import { type SbpmSubjectOptions, SbpmSubjectType } from "./sbpm/subject";

export function isValidSbpmItem(
	item: unknown,
): item is
	| SbpmFunctionStateOptions
	| SbpmFunctionStateTransitionOptions
	| SbpmMessageTransitionOptions
	| SbpmProcessModelOptions
	| SbpmProcessNetworkOptions
	| SbpmProcessTransitionOptions
	| SbpmReceiveStateOptions
	| SbpmReceiveStateTransitionOptions
	| SbpmSendStateOptions
	| SbpmSendStateTransitionOptions
	| SbpmSubjectOptions {
	return (
		typeof item === "object" &&
		item !== null &&
		"type" in item &&
		(item.type === SbpmProcessNetworkType ||
			item.type === SbpmProcessModelType ||
			item.type === SbpmProcessTransitionType ||
			item.type === SbpmSubjectType ||
			item.type === SbpmMessageTransitionType ||
			item.type === SbpmSendStateType ||
			item.type === SbpmSendStateTransitionType ||
			item.type === SbpmReceiveStateType ||
			item.type === SbpmReceiveStateTransitionType ||
			item.type === SbpmFunctionStateType ||
			item.type === SbpmFunctionStateTransitionType)
	);
}
