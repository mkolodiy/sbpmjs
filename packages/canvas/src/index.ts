import {
	type SbpmFunctionStateOptions,
	SbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	type SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import { type SbpmMessageOptions, SbpmMessageType } from "./sbpm/message";
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

export type { SbpmItemId } from "./core/shared/types";

export type SbpmElementType =
	| typeof SbpmProcessNetworkType
	| typeof SbpmProcessModelType
	| typeof SbpmSubjectType
	| typeof SbpmSendStateType
	| typeof SbpmReceiveStateType
	| typeof SbpmFunctionStateType
	| typeof SbpmMessageType;
export type SbpmLinkType =
	| typeof SbpmProcessTransitionType
	| typeof SbpmMessageTransitionType
	| typeof SbpmSendStateTransitionType
	| typeof SbpmReceiveStateTransitionType
	| typeof SbpmFunctionStateTransitionType;
export type SbpmItemType = SbpmElementType | SbpmLinkType;
export type SbpmElementOptions =
	| SbpmFunctionStateOptions
	| SbpmProcessModelOptions
	| SbpmProcessNetworkOptions
	| SbpmMessageOptions
	| SbpmReceiveStateOptions
	| SbpmSendStateOptions
	| SbpmSubjectOptions;
export type SbpmLinkOptions =
	| SbpmFunctionStateTransitionOptions
	| SbpmMessageTransitionOptions
	| SbpmProcessTransitionOptions
	| SbpmReceiveStateTransitionOptions
	| SbpmSendStateTransitionOptions;
export type SbpmItemOptions = SbpmElementOptions | SbpmLinkOptions;
export type {
	SbpmFunctionStateOptions,
	SbpmFunctionStateTransitionOptions,
	SbpmMessageTransitionOptions,
	SbpmProcessModelOptions,
	SbpmProcessNetworkOptions,
	SbpmProcessTransitionOptions,
	SbpmMessageOptions,
	SbpmReceiveStateOptions,
	SbpmReceiveStateTransitionOptions,
	SbpmSendStateOptions,
	SbpmSendStateTransitionOptions,
	SbpmSubjectOptions,
};
export {
	SbpmFunctionStateType,
	SbpmFunctionStateTransitionType,
	SbpmMessageTransitionType,
	SbpmProcessModelType,
	SbpmProcessNetworkType,
	SbpmProcessTransitionType,
	SbpmMessageType,
	SbpmReceiveStateType,
	SbpmReceiveStateTransitionType,
	SbpmSendStateType,
	SbpmSendStateTransitionType,
	SbpmSubjectType,
};
export { isValidSbpmItem } from "./utils";
export { isSbpmLinkType } from "./shared/utils";
export * from "./canvas";
