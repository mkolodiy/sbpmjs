import type { SbpmFunctionStateTransitionType } from "../sbpm/function-state-transition";
import type { SbpmMessageExchangeType } from "../sbpm/message-exchange";
import type { SbpmProcessNetworkTransitionType } from "../sbpm/process-network-transition";
import type { SbpmReceiveStateTransitionType } from "../sbpm/receive-state-transition";
import type { SbpmSendStateTransitionType } from "../sbpm/send-state-transition";

export function createIcon(template: string): string {
	return `data:image/svg+xml;utf8,${encodeURIComponent(template)}`;
}

export function isSbpmLinkType(
	type: string,
): type is
	| SbpmFunctionStateTransitionType
	| SbpmMessageExchangeType
	| SbpmProcessNetworkTransitionType
	| SbpmReceiveStateTransitionType
	| SbpmSendStateTransitionType {
	return (
		type === "sbpm.FunctionStateTransition" ||
		type === "sbpm.MessageExchange" ||
		type === "sbpm.ProcessNetworkTransition" ||
		type === "sbpm.ReceiveStateTransition" ||
		type === "sbpm.SendStateTransition"
	);
}
