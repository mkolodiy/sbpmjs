import type * as joint from "@joint/core";

export interface SbpmItemOptions {
	id?: joint.dia.Cell.ID;
	label: string;
	customData?: {
		[key: string]: unknown;
	};
}
