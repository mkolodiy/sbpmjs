import * as joint from "@joint/core";
import { SbpmLink, type SbpmLinkOptions } from "../core/link";
import type { UpdateOptions } from "../core/shared/types";
import { CustomEvent } from "../shared/constants";
import { autoRenewIcon } from "../shared/icons";

export const SbpmProcessTransitionType = "sbpm.pnd.SbpmProcessTransition";

export interface SbpmProcessTransitionOptions
	extends SbpmLinkOptions<typeof SbpmProcessTransitionType> {}

export class SbpmProcessTransition extends SbpmLink<
	typeof SbpmProcessTransitionType
> {
	constructor(options: SbpmProcessTransitionOptions) {
		const { source, target, id, customData, vertices = [] } = options;

		super({
			type: SbpmProcessTransitionType,
			source: source,
			target: target,
			toolsOptions: [
				{
					type: "remove",
					options: {
						distance: 60,
						action: (evt: joint.dia.Event, linkView: joint.dia.LinkView) => {
							linkView.paper?.trigger(CustomEvent.LINK_REMOVE, linkView, evt);
						},
					},
				},
				{
					type: "reset-vertices",
					options: {
						distance: 84,
						action: (evt: joint.dia.Event, linkView: joint.dia.LinkView) => {
							linkView.paper?.trigger(
								CustomEvent.LINK_REMOVE_VERTICES,
								linkView,
								evt,
							);
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
			],
			customData,
			vertices,
		});

		if (id) {
			this.set("id", id);
		}
	}

	public update(options: UpdateOptions<SbpmProcessTransitionOptions>): void {
		super.update(options);
	}

	public override options(): SbpmProcessTransitionOptions {
		return joint.util.cloneDeep(super.options());
	}
}
