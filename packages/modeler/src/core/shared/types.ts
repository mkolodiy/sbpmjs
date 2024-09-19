import type * as joint from "@joint/core";

export interface SbpmItemOptions<TType extends string> {
	type: TType;
	id?: joint.dia.Cell.ID;
	label: string;
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
	data: {
		toolsOptions: TToolsOptions;
		[key: string]: unknown;
	};
};

export type UpdateOptions<T> = Partial<Omit<T, "id">>;
