export interface GenericOptions {
  [key: string]: unknown;
}

export type SbpmShapeAttributes<InitialOptions, JointOptions, ToolsOptions> = {
  initialOptions?: InitialOptions;
  jointOptions?: JointOptions;
  toolsOptions?: ToolsOptions;
};

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;
