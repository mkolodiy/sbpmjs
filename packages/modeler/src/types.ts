import type {
	SbpmItemType as SbpmCanvasSbpmItemType,
	SbpmItemOptions as SbpmCanvasSbpmItemOptions,
	SbpmItemId as SbpmCanvasSbpmItemId,
	SbpmElementOptions,
} from "@sbpmjs/canvas";

interface SbpmContainerItem {
	contains: Array<SbpmItemId>;
}

export type SbpmItemId = SbpmCanvasSbpmItemId;

declare module "@sbpmjs/canvas" {
	interface SbpmMultiProcessModelOptions extends SbpmContainerItem {}
	interface SbpmProcessModelOptions extends SbpmContainerItem {}
	interface SbpmStandardSubject extends SbpmContainerItem {
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

export const sbpmStandardLayerType = "sbpm.StandardLayer";
export type SbpmStandardLayerType = typeof sbpmStandardLayerType;
export interface SbpmStandardLayerOptions
	extends SbpmElementOptions<SbpmStandardLayerType>,
		SbpmContainerItem {
	implements?: SbpmItemId;
	startSubject: SbpmItemId | undefined;
}

export const sbpmStandardBehaviorType = "sbpm.StandardBehavior";
export type SbpmStandardBehaviorType = typeof sbpmStandardBehaviorType;
export interface SbpmStandardBehaviorOptions
	extends SbpmElementOptions<SbpmStandardBehaviorType>,
		SbpmContainerItem {
	startState: SbpmItemId | undefined;
	endState: SbpmItemId | undefined;
	implements?: SbpmItemId;
}

export const sbpmProcessType = "sbpm.Process";
export type SbpmProcessType = typeof sbpmProcessType;
export interface SbpmProcessOptions
	extends SbpmElementOptions<SbpmProcessType>,
		SbpmContainerItem {}

export type SbpmItemType =
	| SbpmProcessType
	| SbpmStandardLayerType
	| SbpmStandardBehaviorType
	| SbpmCanvasSbpmItemType;
export type SbpmItemOptions =
	| SbpmProcessOptions
	| SbpmStandardLayerOptions
	| SbpmStandardBehaviorOptions
	| SbpmCanvasSbpmItemOptions;

export type SbpmElementShape = Pick<SbpmElementOptions, "id" | "label">;
