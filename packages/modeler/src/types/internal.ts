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
