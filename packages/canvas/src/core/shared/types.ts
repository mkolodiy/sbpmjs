import type * as joint from "@joint/core";

export type SbpmItemId = joint.dia.Cell.ID;

export interface SbpmItemOptions<TType extends string> {
	type: TType;
	id: SbpmItemId;
	customData?: {
		[key: string]: unknown;
	};
}

export type SbpmItemAttributes<
	TType extends string,
	TToolsOptions extends Array<Record<string, unknown>> = Array<
		Record<string, unknown>
	>,
> = {
	type: TType;
	toolsOptions: TToolsOptions;
	[key: string]: unknown;
};

export type UpdateOptions<T> = Partial<Omit<T, "id" | "type">>;
