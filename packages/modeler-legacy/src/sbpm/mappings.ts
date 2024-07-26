import { SbpmFunctionState } from "./function-state";
import { SbpmFunctionStateTransition } from "./function-state-transition";
import { SbpmMessage } from "./message";
import { SbpmMessageTransition } from "./message-transition";
import { SbpmProcessModel } from "./process-model";
import { SbpmProcessNetwork } from "./process-network";
import { SbpmProcessTransition } from "./process-transition";
import { SbpmReceiveState } from "./receive-state";
import { SbpmReceiveStateTransition } from "./receive-state-transition";
import { SbpmSendState } from "./send-state";
import { SbpmSendStateTransition } from "./send-state-transition";
import { SbpmSubject } from "./subject";

export const elementTypeToElementClassMapping = {
	ProcessNetwork: SbpmProcessNetwork,
	ProcessModel: SbpmProcessModel,
	Message: SbpmMessage,
	Subject: SbpmSubject,
	SendState: SbpmSendState,
	ReceiveState: SbpmReceiveState,
	FunctionState: SbpmFunctionState,
} as const;

export const linkTypeToLinkClassMapping = {
	ProcessTransition: SbpmProcessTransition,
	MessageTransition: SbpmMessageTransition,
	SendStateTransition: SbpmSendStateTransition,
	ReceiveStateTransition: SbpmReceiveStateTransition,
	FunctionStateTransition: SbpmFunctionStateTransition,
} as const;

export const elementTypeToLinkClassMapping = {
	ProcessNetwork: SbpmProcessTransition,
	ProcessModel: SbpmProcessTransition,
	Subject: SbpmMessageTransition,
	SendState: SbpmSendStateTransition,
	ReceiveState: SbpmReceiveStateTransition,
	FunctionState: SbpmFunctionStateTransition,
} as const;
