import * as joint from "@joint/core";
import { SbpmLink, type SbpmLinkOptions } from "../core/link";
import type { SbpmElementOptions } from "../core/element";
import {
	createButtonLabel,
	createIconLabel,
	createSelectionLabel,
} from "../core/link-tools";
import type { UpdateOptions } from "../core/shared/types";
import { CustomEvent } from "../shared/constants";
import { autoRenewIcon, deleteIcon } from "../shared/icons";
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

const removeLabel: joint.dia.Link.Label = {
	markup: [],
	attrs: {
		background: {
			xAlignment: 103,
			yAlignment: -40,
		},
		buttonLabel: {
			href: deleteIcon,
			event: CustomEvent.LINK_REMOVE,
			xAlignment: 103,
			yAlignment: -40,
			title: "Remove",
		},
	},
};

const removeVerticesLabel: joint.dia.Link.Label = {
	markup: [],
	attrs: {
		background: {
			xAlignment: 128,
			yAlignment: -40,
		},
		buttonLabel: {
			href: autoRenewIcon,
			event: CustomEvent.LINK_REMOVE_VERTICES,
			xAlignment: 128,
			yAlignment: -40,
			title: "Remove vertices",
		},
	},
};

export const SbpmSendStateTransitionType = "sbpm.sbd.SbpmSendStateTransition";

export interface SbpmSendStateTransitionOptions
	extends SbpmLinkOptions<typeof SbpmSendStateTransitionType> {
	subject?: Pick<SbpmElementOptions, "label" | "id">;
	message?: Pick<SbpmElementOptions, "label" | "id">;
}

export class SbpmSendStateTransition extends SbpmLink<
	typeof SbpmSendStateTransitionType
> {
	constructor(options: SbpmSendStateTransitionOptions) {
		const { id, message, subject, ...restOptions } = options;

		super({
			attrs: {
				wrapper: {
					pointerEvents: "none",
				},
			},
			...restOptions,
			type: SbpmSendStateTransitionType,
			toolsOptions: [],
			message,
			subject,
		});

		this.appendLabel(
			createIconLabel(getIconLabel(iconLabel, subject?.label, message?.label)),
		);

		if (id) {
			this.set("id", id);
		}
	}

	public override update(
		options: UpdateOptions<SbpmSendStateTransitionOptions>,
	) {
		const { subject, message, ...restOptions } = options;

		const updatedIconLabel = getIconLabel(
			this.label(0),
			subject?.label,
			message?.label,
		);
		this.prop("message", message);
		this.prop("subject", subject);
		this.removeLabel(0);
		this.insertLabel(0, updatedIconLabel);
		super.update(restOptions);
	}

	public override options(): SbpmSendStateTransitionOptions {
		const options: SbpmSendStateTransitionOptions = {
			...joint.util.cloneDeep(super.options()),
			message: this.prop("message"),
			subject: this.prop("subject"),
		};
		return options;
	}

	public override select(): void {
		super.select();
		this.appendLabel(createSelectionLabel(selectionLabel));
		this.appendLabel(createButtonLabel(removeLabel));
		this.appendLabel(createButtonLabel(removeVerticesLabel));
	}

	public override deselect(): void {
		super.deselect();
		for (const _label of this.labels().slice(1)) {
			this.removeLabel(-1);
		}
	}
}
