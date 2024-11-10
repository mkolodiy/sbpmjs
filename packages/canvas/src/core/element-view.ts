import * as joint from "@joint/core";
import type { SbpmElement } from "./element";
import { createElementTools } from "./element-tools";

export class SbpmElementView extends joint.dia.ElementView<SbpmElement> {
	public select(): void {
		this.model.select();
		this.addTools(createElementTools(this.model.toolsOptions));
	}

	public refresh(): void {
		if (this.hasTools()) {
			this.hideTools();
			this.addTools(createElementTools(this.model.toolsOptions));
		}
	}
}
