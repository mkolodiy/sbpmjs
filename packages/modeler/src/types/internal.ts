import type * as joint from "@joint/core";

export type SbpmItemAttributes<
	TType extends string = string,
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

export interface SbpmItemOptions {
	id?: joint.dia.Cell.ID;
	label: string;
}

export type GetUpdateOptions<T> = Partial<Omit<T, "id">>;
