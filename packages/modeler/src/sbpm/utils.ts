import type { SbpmElementType } from "../common/types";
import { SbpmFunctionState } from "./function-state";
import { SbpmFunctionStateTransition } from "./function-state-transition";
import { elementTypeToLinkClassMapping } from "./mappings";
import { SbpmMessageTransition } from "./message-transition";
import { SbpmProcessModel } from "./process-model";
import { SbpmProcessTransition } from "./process-transition";
import { SbpmReceiveState } from "./receive-state";
import { SbpmReceiveStateTransition } from "./receive-state-transition";
import { SbpmSendState } from "./send-state";
import { SbpmSendStateTransition } from "./send-state-transition";
import { SbpmSubject } from "./subject";

export function getDefaultLink(type: Exclude<SbpmElementType, "Message">) {
	return new elementTypeToLinkClassMapping[type]();
}

export function isValidConnection(
	cellViewS: joint.dia.CellView,
	cellViewT: joint.dia.CellView,
	linkView: joint.dia.LinkView,
) {
	const isProcessTransitionValid =
		cellViewT.model.isElement() &&
		cellViewT.model instanceof SbpmProcessModel &&
		linkView.model instanceof SbpmProcessTransition;
	const isMessageTransitionValid =
		cellViewT.model.isElement() &&
		cellViewT.model instanceof SbpmSubject &&
		linkView.model instanceof SbpmMessageTransition;
	const isSendStateTransitionValid =
		cellViewT.model.isElement() &&
		(cellViewT.model instanceof SbpmFunctionState ||
			cellViewT.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmSendStateTransition;
	const isReceiveStateTransitionValid =
		cellViewT.model.isElement() &&
		(cellViewT.model instanceof SbpmFunctionState ||
			cellViewT.model instanceof SbpmSendState) &&
		linkView.model instanceof SbpmReceiveStateTransition;
	const isFunctionStateTransitionValid =
		cellViewT.model.isElement() &&
		(cellViewT.model instanceof SbpmSendState ||
			cellViewT.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmFunctionStateTransition;
	const valid = cellViewS.model.get("id") !== cellViewT.model.get("id");

	return (
		valid &&
		(isProcessTransitionValid ||
			isMessageTransitionValid ||
			isSendStateTransitionValid ||
			isReceiveStateTransitionValid ||
			isFunctionStateTransitionValid)
	);
}
