import * as joint from "@joint/core";
import { SbpmLink, type SbpmLinkOptions } from "../core/link";
import type { UpdateOptions } from "../core/shared/types";
import { CustomEvent } from "../shared/constants";
import { autoRenewIcon } from "../shared/icons";

export const sbpmProcessNetworkTransitionType = "sbpm.ProcessNetworkTransition";
export type SbpmProcessNetworkTransitionType =
	typeof sbpmProcessNetworkTransitionType;
export interface SbpmProcessNetworkTransitionOptions
	extends SbpmLinkOptions<SbpmProcessNetworkTransitionType> {}

export class SbpmProcessNetworkTransition extends SbpmLink<SbpmProcessNetworkTransitionType> {
	constructor(options: SbpmProcessNetworkTransitionOptions) {
		const { fromElement, toElement, ...restOptions } = options;

		super({
			...restOptions,
			type: "sbpm.ProcessNetworkTransition",
			source: { id: fromElement },
			target: { id: toElement },
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
									href: autoRenewIcon,
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
		});
	}

	public update(
		options: UpdateOptions<SbpmProcessNetworkTransitionOptions>,
	): void {
		super.update(options);
	}

	public override options(): SbpmProcessNetworkTransitionOptions {
		return joint.util.cloneDeep(super.options());
	}
}
