import * as joint from "@joint/core";
import { blueDotIcon, redDotIcon } from "../../shared/icons";

export function getStateModifierOptions(stateRole: "start" | "end" | "none") {
	if (stateRole !== "none") {
		return {
			xlinkHref: stateRole === "start" ? blueDotIcon : redDotIcon,
			opacity: "0.5",
		};
	}

	return {
		opacity: "0",
	};
}

export function getIconLabel(
	iconLabel: joint.dia.Link.Label,
	subject: string | undefined,
	message: string | undefined,
) {
	let updatedIconLabel = iconLabel;

	if (message) {
		updatedIconLabel = updateLabelText(updatedIconLabel, "bodyText", message);
	}

	if (subject) {
		updatedIconLabel = updateLabelText(updatedIconLabel, "headerText", subject);
	}

	return updatedIconLabel;
}

export function updateLabelText(
	iconLabel: joint.dia.Link.Label,
	key: string,
	text: string,
) {
	return joint.util.merge(iconLabel, {
		attrs: { [key]: { text: text } },
	});
}
