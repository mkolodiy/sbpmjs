import * as joint from "@joint/core";
import type { SbpmLink } from "./link";
import { createLinkTools } from "./link-tools";

export class SbpmLinkView extends joint.dia.LinkView<SbpmLink> {
	public select(): void {
		if (this.model.hasTarget()) {
			this.model.select();
			if (this.hasTools()) {
				this.showTools();
				return;
			}
			this.removeTools();
			this.addTools(createLinkTools(this.model.getToolsOptions()));
		}
	}

	public refresh(): void {
		this.select();
	}
}
