import type * as joint from "@joint/core";
import { SbpmLink } from "../core/link";
import {
	createButtonLabel,
	createIconLabel,
	createSelectionLabel,
} from "../core/link-tools";
import type { SbpmItemId, UpdateOptions } from "../core/shared/types";
import { CustomEvent } from "../shared/constants";
import type { Icons } from "../shared/types";
import type { SbpmStateTransitionOptions } from "./shared/types";
import { getIconLabel } from "./shared/utils";

const iconLabel: joint.dia.Link.Label = {
	markup: [
		{
			tagName: "rect",
			selector: "body",
		},
		{
			tagName: "rect",
			selector: "header",
		},
		{
			tagName: "text",
			selector: "headerText",
		},
		{
			tagName: "text",
			selector: "bodyText",
		},
	],
	attrs: {
		body: {
			width: 180,
			height: 60,
			strokeWidth: 2,
			stroke: "#b3b3b3ff",
			fill: "#FFFFFF",
			xAlignment: "middle",
			yAlignment: "middle",
			cursor: "pointer",
		},
		header: {
			width: 180,
			height: 30,
			strokeWidth: 2,
			stroke: "#b3b3b3ff",
			fill: "#FFFFFF",
			xAlignment: "middle",
			yAlignment: -30,
			cursor: "pointer",
		},
		headerText: {
			xAlignment: "middle",
			yAlignment: -25,
			textWrap: {
				width: 180,
				height: 30,
			},
			cursor: "pointer",
			textVerticalAnchor: "middle",
			textAnchor: "middle",
			fontSize: 14,
		},
		bodyText: {
			xAlignment: "middle",
			yAlignment: 5,
			textWrap: {
				width: 180,
				height: 30,
			},
			cursor: "pointer",
			textVerticalAnchor: "middle",
			textAnchor: "middle",
			fontSize: 14,
		},
	},
};

const selectionLabel: joint.dia.Link.Label = {
	markup: [],
	attrs: {
		selectionLabel: {
			width: 195,
			height: 75,
		},
	},
};

function removeLabel(icons: Icons): joint.dia.Link.Label {
	return {
		markup: [],
		attrs: {
			background: {
				xAlignment: 103,
				yAlignment: -40,
			},
			buttonLabel: {
				href: icons.deleteIcon,
				event: CustomEvent.LINK_REMOVE,
				xAlignment: 103,
				yAlignment: -40,
				title: "Remove",
			},
		},
	};
}

function removeVerticesLabel(icons: Icons): joint.dia.Link.Label {
	return {
		markup: [],
		attrs: {
			background: {
				xAlignment: 128,
				yAlignment: -40,
			},
			buttonLabel: {
				href: icons.autoRenewIcon,
				event: CustomEvent.LINK_REMOVE_VERTICES,
				xAlignment: 128,
				yAlignment: -40,
				title: "Remove vertices",
			},
		},
	};
}

export const sbpmSendStateTransitionType = "sbpm.SendStateTransition";
export type SbpmSendStateTransitionType = typeof sbpmSendStateTransitionType;
export interface SbpmSendStateTransitionOptions
	extends SbpmStateTransitionOptions<SbpmSendStateTransitionType> {
	receiverSubject: SbpmItemId | undefined;
	message: SbpmItemId | undefined;
}

export class SbpmSendStateTransition extends SbpmLink<SbpmSendStateTransitionType> {
	constructor(options: SbpmSendStateTransitionOptions) {
		const { message, receiverSubject, fromElement, toElement, ...restOptions } =
			options;
		super({
			...restOptions,
			attrs: {
				wrapper: {
					pointerEvents: "none",
				},
			},
			type: "sbpm.SendStateTransition",
			toolsOptions: [],
			message,
			receiverSubject,
			source: { id: fromElement },
			target: { id: toElement },
		});
		this.appendLabel(
			createIconLabel(getIconLabel(iconLabel, receiverSubject, message)),
		);
	}

	public override update(
		options: UpdateOptions<SbpmSendStateTransitionOptions>,
	) {
		const { message, receiverSubject, ...restOptions } = options;

		const updatedIconLabel = getIconLabel(
			this.label(0),
			receiverSubject,
			message,
		);
		this.prop("message", message);
		this.prop("receiverSubject", receiverSubject);
		this.removeLabel(0);
		this.insertLabel(0, updatedIconLabel);
		super.update(restOptions);
	}

	public override options(): SbpmSendStateTransitionOptions {
		const baseOptions = super.options();
		const options: SbpmSendStateTransitionOptions = {
			...baseOptions,
			message: this.prop("message"),
			receiverSubject: this.prop("receiverSubject"),
		};
		return options;
	}

	public override select(): void {
		super.select();
		this.appendLabel(createSelectionLabel(selectionLabel));
		this.appendLabel(createButtonLabel(removeLabel(this.graph.icons)));
		this.appendLabel(createButtonLabel(removeVerticesLabel(this.graph.icons)));
	}

	public override deselect(): void {
		super.deselect();
		for (const _label of this.labels().slice(1)) {
			this.removeLabel(-1);
		}
	}
}
