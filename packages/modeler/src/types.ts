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
	interface SbpmInterfaceSubjectOptions {
		references: SbpmItemId | undefined;
	}
	interface SbpmMultiProcessModelOptions extends SbpmContainerItem {}
	interface SbpmProcessModelOptions extends SbpmContainerItem {}
	interface SbpmStandardSubjectOptions extends SbpmContainerItem {
		implements?: SbpmItemId;
	}
	interface SbpmMessageExchangeOptions extends SbpmContainerItem {}
	interface SbpmStateOptions {
		references?: SbpmItemId;
	}
	interface SbpmBaseStateTransitionOptions {
		priority?: number;
	}
	interface SbpmStandardBehaviorOptions extends SbpmContainerItem {
		startState: SbpmItemId | undefined;
		endState: SbpmItemId | undefined;
		implements?: SbpmItemId;
	}
	interface SbpmStandardLayerOptions extends SbpmContainerItem {
		implements?: SbpmItemId;
		startSubject: SbpmItemId | undefined;
	}
}

export const sbpmProcessType = "sbpm.Process";
export type SbpmProcessType = typeof sbpmProcessType;
export interface SbpmProcessOptions
	extends Omit<SbpmElementOptions<SbpmProcessType>, "position">,
		SbpmContainerItem {}

export type SbpmItemType = SbpmProcessType | SbpmCanvasSbpmItemType;
export type SbpmItemOptions = SbpmProcessOptions | SbpmCanvasSbpmItemOptions;
