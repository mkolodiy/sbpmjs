import type { SbpmItemId, SbpmItemPosition } from "./core/shared/types";
import type { SbpmElementOptions } from "./core/element";
import type { SbpmLinkOptions } from "./core/link";
import type {
	SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import type {
	SbpmFunctionStateOptions,
	SbpmFunctionStateType,
} from "./sbpm/function-state";
import type {
	SbpmMessageExchangeOptions,
	SbpmMessageExchangeType,
} from "./sbpm/message-exchange";
import type {
	SbpmMessageSpecificationOptions,
	SbpmMessageSpecificationType,
} from "./sbpm/message-specification";
import type {
	SbpmMultiProcessModelOptions,
	SbpmMultiProcessModelType,
} from "./sbpm/multi-process-model";
import type {
	SbpmProcessModelOptions,
	SbpmProcessModelType,
} from "./sbpm/process-model";
import type {
	SbpmProcessNetworkTransitionOptions,
	SbpmProcessNetworkTransitionType,
} from "./sbpm/process-network-transition";
import type {
	SbpmProcessNetworkOptions,
	SbpmProcessNetworkType,
} from "./sbpm/process-network";
import type {
	SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateTransitionType,
} from "./sbpm/receive-state-transition";
import type {
	SbpmReceiveStateOptions,
	SbpmReceiveStateType,
} from "./sbpm/receive-state";
import type {
	SbpmSendStateTransitionOptions,
	SbpmSendStateTransitionType,
} from "./sbpm/send-state-transition";
import type {
	SbpmSendStateOptions,
	SbpmSendStateType,
} from "./sbpm/send-state";
import type {
	SbpmStandardSubjectOptions,
	SbpmStandardSubjectType,
} from "./sbpm/standard-subject";
import type {
	SbpmStateOptions,
	SbpmBaseStateTransitionOptions,
} from "./sbpm/shared/types";

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
	| SbpmStandardSubjectType;

export type {
	SbpmItemId,
	SbpmItemPosition,
	SbpmElementOptions,
	SbpmLinkOptions,
	SbpmStateOptions,
	SbpmBaseStateTransitionOptions,
	SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateOptions,
	SbpmMessageExchangeOptions,
	SbpmMessageSpecificationOptions,
	SbpmMultiProcessModelOptions,
	SbpmProcessModelOptions,
	SbpmProcessNetworkTransitionOptions,
	SbpmProcessNetworkOptions,
	SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateOptions,
	SbpmSendStateTransitionOptions,
	SbpmSendStateOptions,
	SbpmStandardSubjectOptions,
};

export * from "./canvas";
export { isSbpmLinkType } from "./shared/utils";
