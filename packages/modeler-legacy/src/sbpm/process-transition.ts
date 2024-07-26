import * as joint from "@joint/core";
import type { SbpmModelerOptions } from "../canvas";
import { autoRenewIcon } from "../common/icons";
import type {
	GetUpdateOptions,
	SbpmProcessTransition as SbpmProcessTransitionOptions,
	SbpmProcessTransitionType,
} from "../common/types";
import { createJointType } from "../common/utils";
import {
	SbpmLink,
	type SbpmLinkAttributes,
	handleEndpoint,
} from "../core/link";
import type { SbpmLinkToolsOptions } from "../core/link-tools";
import {
	type SbpmLinkView,
	addActionsToLinkToolsOptions,
} from "../core/link-view";

const toolsOptions: SbpmLinkToolsOptions = [
	{
		type: "remove",
		options: {
			distance: 60,
		},
	},
	{
		type: "reset-vertices",
		options: {
			distance: 84,
			action: (_evt: joint.dia.Event, linkView: joint.dia.LinkView) => {
				(linkView as SbpmLinkView).link.resetVertices();
			},
			markup: [
				{
					tagName: "rect",
				},
				{
					tagName: "image",
					attributes: {
						"xlink:href": autoRenewIcon,
					},
				},
				{
					tagName: "title",
					textContent: "Reset vertices",
				},
			],
		},
	},
];

export class SbpmProcessTransition extends SbpmLink {
	type: SbpmProcessTransitionType = "ProcessTransition";

	constructor(
		options: SbpmProcessTransitionOptions = {} as SbpmProcessTransitionOptions,
		modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions,
	) {
		const { source, target, ...restOptions } = options;

		const attributes = joint.util.merge(
			{},
			{
				toolsOptions: addActionsToLinkToolsOptions(
					toolsOptions,
					modelerOptions,
				),
				type: createJointType("sbpm.pnd", "ProcessTransition"),
				source: handleEndpoint(source),
				target: handleEndpoint(target),
				...restOptions,
			},
		) as SbpmLinkAttributes;

		super(attributes);
	}

	public update(options: GetUpdateOptions<SbpmProcessTransitionOptions>) {
		super.update(options);
	}
}
