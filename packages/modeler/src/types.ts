import type {
	SbpmItemType as SbpmCanvasSbpmItemType,
	SbpmItemOptions as SbpmCanvasSbpmItemOptions,
	SbpmItemId as SbpmCanvasSbpmItemId,
	SbpmElementOptions,
} from "@sbpmjs/canvas";

declare module "@sbpmjs/canvas" {
	interface SbpmProcessModelOptions {
		contains: Array<SbpmItemId>;
	}
	interface SbpmSubjectOptions {
		contains: Array<SbpmItemId>;
	}
	interface SbpmMessageTransitionOptions {
		contains: Array<SbpmItemId>;
	}
}

export const SbpmProcessType = "sbpm.pnd.SbpmProcess";

export type SbpmItemType = typeof SbpmProcessType | SbpmCanvasSbpmItemType;

export interface SbpmProcessOptions {
	type: "sbpm.pnd.SbpmProcess";
	label: string;
	id: SbpmItemId;
	contains: Array<SbpmItemId>;
}

export type SbpmItemOptions = SbpmProcessOptions | SbpmCanvasSbpmItemOptions;

export type SbpmItemId = SbpmCanvasSbpmItemId;

export type SbpmElementShape = Pick<SbpmElementOptions, "id" | "label">;
