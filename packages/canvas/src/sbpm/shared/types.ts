import type { SbpmElementOptions } from "../../core/element";
import type { SbpmLinkOptions } from "../../core/link";

export interface SbpmStateOptions<TType extends string = string>
	extends SbpmElementOptions<TType> {
	role?: "start" | "end";
}

export interface SbpmStateTransitionOptions<TType extends string = string>
	extends SbpmLinkOptions<TType> {}
