import type {
	SbpmItemType as SbpmCanvasSbpmItemType,
	SbpmItemOptions as SbpmCanvasSbpmItemOptions,
	SbpmItemId as SbpmCanvasSbpmItemId,
	SbpmElementOptions,
} from "@sbpmjs/canvas";

interface SbpmContainerItem {
	contains: Array<SbpmItemId> | undefined;
}

export type SbpmItemId = SbpmCanvasSbpmItemId;

declare module "@sbpmjs/canvas" {
	interface SbpmMultiProcessModelOptions extends SbpmContainerItem {}
	interface SbpmProcessModelOptions extends SbpmContainerItem {}
	interface SbpmStandardSubject {
		behavior: SbpmItemId | undefined;
		implements?: SbpmItemId;
	}
	interface SbpmMessageExchangeOptions extends SbpmContainerItem {}
	interface SbpmStateOptions {
		references?: SbpmItemId;
	}
	interface SbpmBaseStateTransitionOptions {
		priority?: number;
	}
}

export type SbpmStandardLayerType = "sbpm.StandardLayer";
export interface SbpmStandardLayerOptions
	extends SbpmElementOptions<SbpmStandardLayerType>,
		SbpmContainerItem {
	implements?: SbpmItemId;
	startSubject: SbpmItemId | undefined;
}

export type SbpmStandardBehaviorType = "sbpm.StandardBehavior";
export interface SbpmStandardBehaviorOptions
	extends SbpmElementOptions<SbpmStandardBehaviorType>,
		SbpmContainerItem {
	startState: SbpmItemId | undefined;
	endState: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export type SbpmProcessType = "sbpm.pnd.SbpmProcess";
export interface SbpmProcessOptions
	extends SbpmElementOptions<SbpmProcessType>,
		SbpmContainerItem {}

export type SbpmItemType = SbpmProcessType | SbpmCanvasSbpmItemType;
export type SbpmItemOptions = SbpmProcessOptions | SbpmCanvasSbpmItemOptions;

export type SbpmElementShape = Pick<SbpmElementOptions, "id" | "label">;
