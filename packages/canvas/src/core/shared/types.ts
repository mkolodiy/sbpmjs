export type SbpmItemId = string;

export interface SbpmItemPosition {
	x: number;
	y: number;
}

export interface SbpmBaseItemOptions<TType extends string = string> {
	id: SbpmItemId;
	type: TType;
	label: string;
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
