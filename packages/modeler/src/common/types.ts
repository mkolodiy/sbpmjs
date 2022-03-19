export interface GenericOptions {
  [key: string]: any;
}

export type SbpmShapeAttributes<InitialOptions, JointOptions, ToolsOptions> = {
  initialOptions?: InitialOptions;
  jointOptions?: JointOptions;
  toolsOptions?: ToolsOptions;
};
