import * as joint from "@joint/core";
import type { SbpmModelerOptions } from "../canvas";
import type { SbpmLink } from "./link";
import { createLinkTools } from "./link-tools";
import type { SbpmLinkToolsOptions } from "./link-tools";

export class SbpmLinkView extends joint.dia.LinkView {
	// Workaround to have all custom properties and methods on the model
	public get link() {
		return this.model as SbpmLink;
	}

	public select() {
		if (this.link.hasTarget()) {
			this.link.select();
			this.addTools(createLinkTools(this.link.toolsOptions));
		}
	}
}

export function addActionsToLinkToolsOptions(
	toolsOptions: SbpmLinkToolsOptions,
	modelerOptions: SbpmModelerOptions,
): SbpmLinkToolsOptions {
	const { onDeleteLink, onOpenLink } = modelerOptions;

	const toolsOptionsCopy = joint.util.cloneDeep(toolsOptions);

	for (const toolOption of toolsOptionsCopy) {
		if (toolOption.type === "remove") {
			toolOption.options.action = (
				_evt: joint.dia.Event,
				linkView: joint.dia.LinkView,
				tool: joint.dia.ToolView,
			) => {
				onDeleteLink?.((linkView as SbpmLinkView).link);
				(linkView as SbpmLinkView).link.remove({ ui: true, tool: tool.cid });
			};
		}

		if (toolOption.type === "open") {
			toolOption.options.action = (
				_evt: joint.dia.Event,
				linkView: joint.dia.LinkView,
			) => {
				onOpenLink?.((linkView as SbpmLinkView).link);
			};
		}
	}

	return toolsOptionsCopy;
}
