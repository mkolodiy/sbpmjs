import * as joint from "@joint/core";
import type { SbpmElement } from "./element";
import { createElementTools } from "./element-tools";

export class SbpmElementView extends joint.dia.ElementView<SbpmElement> {
	public select(): void {
		this.model.select();
		if (this.hasTools()) {
			this.showTools();
		} else {
			this.addTools(createElementTools(this.model.getToolsOptions()));
		}
	}

	public refresh(): void {
		this.select();
	}
}
