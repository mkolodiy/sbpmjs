import * as joint from "@joint/core";
import { SbpmLink, type SbpmLinkOptions } from "../core/link";
import {
	createButtonLabel,
	createIconLabel,
	createSelectionLabel,
} from "../core/link-tools";
import type { UpdateOptions } from "../core/shared/types";
import { CustomEvent } from "../shared/constants";
import { autoRenewIcon, deleteIcon } from "../shared/icons";
import { updateLabelText } from "./shared/utils";

const iconLabel: joint.dia.Link.Label = {
	markup: [
		{
			tagName: "rect",
			selector: "body",
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
		bodyText: {
			xAlignment: "middle",
			yAlignment: "middle",
			textWrap: {
				width: 180,
				height: 60,
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

export const SbpmFunctionStateTransitionType =
	"sbpm.sbd.SbpmFunctionStateTransition";

export interface SbpmFunctionStateTransitionOptions
	extends SbpmLinkOptions<typeof SbpmFunctionStateTransitionType> {
	label: string;
}

export class SbpmFunctionStateTransition extends SbpmLink<
	typeof SbpmFunctionStateTransitionType
> {
	constructor(options: SbpmFunctionStateTransitionOptions) {
		const { label, ...restOptions } = options;

		super({
			attrs: {
				wrapper: {
					pointerEvents: "none",
				},
			},
			...restOptions,
			type: SbpmFunctionStateTransitionType,
			toolsOptions: [],
		});

		this.appendLabel(
			createIconLabel(updateLabelText(iconLabel, "bodyText", label)),
		);
	}

	public override update(
		options: UpdateOptions<SbpmFunctionStateTransitionOptions>,
	): void {
		const { label, ...restOptions } = options;

		if (label) {
			const updatedIconLabel = updateLabelText(iconLabel, "bodyText", label);
			this.removeLabel(0);
			this.insertLabel(0, updatedIconLabel);
			this.prop("label", label);
		}

		super.update(restOptions);
	}

	public options(): SbpmFunctionStateTransitionOptions {
		const options: SbpmFunctionStateTransitionOptions = {
			...joint.util.cloneDeep(super.options()),
			label: this.prop("label"),
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
