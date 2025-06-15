export type SbpmItemId = string;

export interface SbpmItemPosition {
	x: number;
	y: number;
}

interface SbpmItemIdOption {
	id: SbpmItemId;
}

interface SbpmItemTypeOption<TType extends string = string> {
	type: TType;
}

interface SbpmItemLabelOption {
	label: string;
}

export interface SbpmItemReferenceOptions
	extends SbpmItemIdOption,
		SbpmItemLabelOption {}

export interface SbpmBaseItemOptions<TType extends string = string>
	extends SbpmItemIdOption,
		SbpmItemTypeOption<TType>,
		SbpmItemLabelOption {}

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
