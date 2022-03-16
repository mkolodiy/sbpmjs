import * as joint from 'jointjs';

export interface GenericOptions {
  [key: string]: any;
}

type SbpmShapeAttributes<InitialOptions, JointOptions, ToolsOptions> = {
  initialOptions: InitialOptions;
  jointOptions: JointOptions;
  toolsOptions: ToolsOptions;
};

export type SbpmElementAttributes<T> = joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.ImageAttributes, SbpmElementToolsOptions>;

export type SbpmLinkAttributes<T> = joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.LinkAttributes, SbpmLinkToolsOptions>;

export type SbpmBoundaryToolOptions = { type: 'boundary'; options: joint.elementTools.Boundary.Options };

export type SbpmButtonToolOptions = { type: 'button'; options: joint.elementTools.Button.Options };

export type SbpmConnectToolOptions = { type: 'connect'; options: joint.elementTools.Connect.Options };

export type SbpmControlToolOptions = { type: 'control'; options: joint.elementTools.Control.Options };

export type SbpmRemoveToolOptions = { type: 'remove'; options: joint.elementTools.Button.Options };

export type SbpmElementToolsOptions = (
  | SbpmBoundaryToolOptions
  | SbpmButtonToolOptions
  | SbpmConnectToolOptions
  | SbpmControlToolOptions
  | SbpmRemoveToolOptions
)[];

export type SbpmLinkToolsOptions = any[];

export type SbpmElementOptions = {
  id?: string;
  label: string;
  position: joint.dia.Point;
};

export type SbpmProcessNetworkOptions = SbpmElementOptions;

export type SbpmProcessModelOptions = SbpmElementOptions;

export type SbpmProcessModelTransitionOptions = {
  source: string;
  target: string;
};

export type SbpmModelerOptions = {
  container: HTMLElement;
};
