export interface GenericOptions {
  [key: string]: unknown;
}

export type SbpmShapeAttributes<InitialOptions, JointOptions, ToolsOptions> = {
  initialOptions: InitialOptions | undefined;
  jointOptions: JointOptions | undefined;
  toolsOptions: ToolsOptions | undefined;
};

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;
