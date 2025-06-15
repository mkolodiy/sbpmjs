import type { SbpmElementOptions } from "./core/element";
import type { SbpmLinkOptions } from "./core/link";
import type {
	SbpmItemId,
	SbpmItemReferenceOptions,
	SbpmItemPosition,
} from "./core/shared/types";
import {
	type SbpmFunctionStateOptions,
	type SbpmFunctionStateType,
	sbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	type SbpmFunctionStateTransitionOptions,
	type SbpmFunctionStateTransitionType,
	sbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import {
	type SbpmMessageExchangeOptions,
	type SbpmMessageExchangeType,
	sbpmMessageExchangeType,
} from "./sbpm/message-exchange";
import {
	type SbpmMessageSpecificationOptions,
	type SbpmMessageSpecificationType,
	sbpmMessageSpecificationType,
} from "./sbpm/message-specification";
import {
	type SbpmMultiProcessModelOptions,
	type SbpmMultiProcessModelType,
	sbpmMultiProcessModelType,
} from "./sbpm/multi-process-model";
import {
	type SbpmProcessModelOptions,
	type SbpmProcessModelType,
	sbpmProcessModelType,
} from "./sbpm/process-model";
import {
	type SbpmProcessNetworkOptions,
	type SbpmProcessNetworkType,
	sbpmProcessNetworkType,
} from "./sbpm/process-network";
import {
	type SbpmProcessNetworkTransitionOptions,
	type SbpmProcessNetworkTransitionType,
	sbpmProcessNetworkTransitionType,
} from "./sbpm/process-network-transition";
import {
	type SbpmReceiveStateOptions,
	type SbpmReceiveStateType,
	sbpmReceiveStateType,
} from "./sbpm/receive-state";
import {
	type SbpmReceiveStateTransitionOptions,
	type SbpmReceiveStateTransitionType,
	sbpmReceiveStateTransitionType,
} from "./sbpm/receive-state-transition";
import {
	type SbpmSendStateOptions,
	type SbpmSendStateType,
	sbpmSendStateType,
} from "./sbpm/send-state";
import {
	type SbpmSendStateTransitionOptions,
	type SbpmSendStateTransitionType,
	sbpmSendStateTransitionType,
} from "./sbpm/send-state-transition";
import type {
	SbpmStateOptions,
	SbpmStateTransitionOptions,
} from "./sbpm/shared/types";
import {
	type SbpmStandardBehaviorOptions,
	type SbpmStandardBehaviorType,
	sbpmStandardBehaviorType,
} from "./sbpm/standard-behavior";
import {
	type SbpmStandardLayerOptions,
	type SbpmStandardLayerType,
	sbpmStandardLayerType,
} from "./sbpm/standard-layer";
import {
	type SbpmStandardSubjectOptions,
	type SbpmStandardSubjectType,
	sbpmStandardSubjectType,
} from "./sbpm/standard-subject";

export type SbpmItemOptions =
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
	| SbpmStandardBehaviorOptions
	| SbpmStandardLayerOptions
	| SbpmStandardSubjectOptions;

export type SbpmItemType =
	| SbpmFunctionStateTransitionType
	| SbpmFunctionStateType
	| SbpmMessageExchangeType
	| SbpmMessageSpecificationType
	| SbpmMultiProcessModelType
	| SbpmProcessModelType
	| SbpmProcessNetworkTransitionType
	| SbpmProcessNetworkType
	| SbpmReceiveStateTransitionType
	| SbpmReceiveStateType
	| SbpmSendStateTransitionType
	| SbpmSendStateType
	| SbpmStandardBehaviorType
	| SbpmStandardLayerType
	| SbpmStandardSubjectType;

export type {
	SbpmItemReferenceOptions,
	SbpmElementOptions,
	SbpmFunctionStateOptions,
	SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
	SbpmFunctionStateType,
	SbpmItemId,
	SbpmItemPosition,
	SbpmLinkOptions,
	SbpmMessageExchangeOptions,
	SbpmMessageExchangeType,
	SbpmMessageSpecificationOptions,
	SbpmMessageSpecificationType,
	SbpmMultiProcessModelOptions,
	SbpmMultiProcessModelType,
	SbpmProcessModelOptions,
	SbpmProcessModelType,
	SbpmProcessNetworkOptions,
	SbpmProcessNetworkTransitionOptions,
	SbpmProcessNetworkTransitionType,
	SbpmProcessNetworkType,
	SbpmReceiveStateOptions,
	SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateTransitionType,
	SbpmReceiveStateType,
	SbpmSendStateOptions,
	SbpmSendStateTransitionOptions,
	SbpmSendStateTransitionType,
	SbpmSendStateType,
	SbpmStandardBehaviorOptions,
	SbpmStandardBehaviorType,
	SbpmStandardLayerOptions,
	SbpmStandardLayerType,
	SbpmStandardSubjectOptions,
	SbpmStandardSubjectType,
	SbpmStateOptions,
	SbpmStateTransitionOptions,
};

export {
	sbpmFunctionStateTransitionType,
	sbpmFunctionStateType,
	sbpmMessageExchangeType,
	sbpmMessageSpecificationType,
	sbpmMultiProcessModelType,
	sbpmProcessModelType,
	sbpmProcessNetworkTransitionType,
	sbpmProcessNetworkType,
	sbpmReceiveStateTransitionType,
	sbpmReceiveStateType,
	sbpmSendStateTransitionType,
	sbpmSendStateType,
	sbpmStandardBehaviorType,
	sbpmStandardLayerType,
	sbpmStandardSubjectType,
};

export * from "./canvas";
export {
	isElementType,
	isLinkType,
	isValidItem,
	isValidLinkItem,
} from "./shared/utils";
