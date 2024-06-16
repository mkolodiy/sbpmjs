import type {
	GetUpdateOptions,
	SbpmFunctionState as SbpmFunctionStateOptions,
	SbpmFunctionStateTransition as SbpmFunctionStateTransitionOptions,
	SbpmMessage as SbpmMessageOptions,
	SbpmProcessTransition as SbpmMessageTransitionOptions,
	SbpmProcessModel as SbpmProcessModelOptions,
	SbpmProcessNetwork as SbpmProcessNetworkOptions,
	SbpmProcessTransition as SbpmProcessTransitionOptions,
	SbpmReceiveState as SbpmReceiveStateOptions,
	SbpmReceiveStateTransition as SbpmReceiveStateTransitionOptions,
	SbpmSendState as SbpmSendStateOptions,
	SbpmSendStateTransition as SbpmSendStateTransitionOptions,
	SbpmSubject as SbpmSubjectOptions,
} from "../common/types";
import type { SbpmElement } from "../core/element";
import type { SbpmLink } from "../core/link";
import type { SbpmFunctionState } from "./function-state";
import type { SbpmFunctionStateTransition } from "./function-state-transition";
import type { SbpmMessage } from "./message";
import type { SbpmMessageTransition } from "./message-transition";
import type { SbpmProcessModel } from "./process-model";
import type { SbpmProcessNetwork } from "./process-network";
import type { SbpmProcessTransition } from "./process-transition";
import type { SbpmReceiveState } from "./receive-state";
import type { SbpmReceiveStateTransition } from "./receive-state-transition";
import type { SbpmSendState } from "./send-state";
import type { SbpmSendStateTransition } from "./send-state-transition";
import type { SbpmSubject } from "./subject";

type GetElementOptionsType<T extends SbpmElement> = T extends SbpmProcessNetwork
	? SbpmProcessNetworkOptions
	: T extends SbpmProcessModel
		? SbpmProcessModelOptions
		: T extends SbpmMessage
			? SbpmMessageOptions
			: T extends SbpmSubject
				? SbpmSubjectOptions
				: T extends SbpmSendState
					? SbpmSendStateOptions
					: T extends SbpmReceiveState
						? SbpmReceiveStateOptions
						: T extends SbpmFunctionState
							? SbpmFunctionStateOptions
							: undefined;

export type GetSbpmElementUpdateOptions<T extends SbpmElement> =
	GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T extends SbpmLink> = T extends SbpmProcessTransition
	? SbpmProcessTransitionOptions
	: T extends SbpmMessageTransition
		? SbpmMessageTransitionOptions
		: T extends SbpmSendStateTransition
			? SbpmSendStateTransitionOptions
			: T extends SbpmReceiveStateTransition
				? SbpmReceiveStateTransitionOptions
				: T extends SbpmFunctionStateTransition
					? SbpmFunctionStateTransitionOptions
					: undefined;

export type GetSbpmLinkUpdateOptions<T extends SbpmLink> = GetUpdateOptions<
	GetLinkOptionsType<T>
>;

export type ElementTypeToElementClassMapping = {
	ProcessNetwork: SbpmProcessNetwork;
	ProcessModel: SbpmProcessModel;
	Message: SbpmMessage;
	Subject: SbpmSubject;
	SendState: SbpmSendState;
	ReceiveState: SbpmReceiveState;
	FunctionState: SbpmFunctionState;
};

export type LinkTypeToLinkClassMapping = {
	ProcessTransition: SbpmProcessTransition;
	MessageTransition: SbpmMessageTransition;
	SendStateTransition: SbpmSendStateTransition;
	ReceiveStateTransition: SbpmReceiveStateTransition;
	FunctionStateTransition: SbpmFunctionStateTransition;
};
