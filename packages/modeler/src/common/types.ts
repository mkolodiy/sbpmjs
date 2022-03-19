import * as joint from 'jointjs';

export interface GenericOptions {
  [key: string]: any;
}

type SbpmShapeAttributes<InitialOptions, JointOptions, ToolsOptions> = {
  initialOptions?: InitialOptions;
  jointOptions?: JointOptions;
  toolsOptions?: ToolsOptions;
};

export type SbpmElementAttributes<T> = joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.ImageAttributes, SbpmElementToolsOptions>;

export type SbpmLinkAttributes<T> = joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
  SbpmShapeAttributes<T, joint.shapes.standard.LinkAttributes, SbpmLinkToolsOptions>;

export type SbpmElementBoundaryToolOptions = { type: 'boundary'; options: joint.elementTools.Boundary.Options };

export type SbpmElementButtonToolOptions = { type: 'button'; options: joint.elementTools.Button.Options };

export type SbpmElementConnectToolOptions = { type: 'connect'; options: joint.elementTools.Connect.Options };

export type SbpmElementControlToolOptions = { type: 'control'; options: joint.elementTools.Control.Options };

export type SbpmElementRemoveToolOptions = { type: 'remove'; options: joint.elementTools.Button.Options };

export type SbpmElementToolsOptions = (
  | SbpmElementBoundaryToolOptions
  | SbpmElementButtonToolOptions
  | SbpmElementConnectToolOptions
  | SbpmElementControlToolOptions
  | SbpmElementRemoveToolOptions
)[];

export type SbpmLinkButtonToolOptions = { type: 'button'; options: joint.linkTools.Button.Options };

export type SbpmLinkRemoveToolOptions = { type: 'remove'; options: joint.linkTools.Button.Options };

export type SbpmLinkToolsOptions = (SbpmLinkButtonToolOptions | SbpmLinkRemoveToolOptions)[];

export type SbpmElementOptions = {
  id?: string;
  label: string;
  position: joint.dia.Point;
};

export type SbpmLinkOptions<S = unknown, T = unknown> = {
  id?: string;
  source?: S;
  target?: T;
};

export type SbpmProcessNetworkOptions = SbpmElementOptions;

export type SbpmProcessModelOptions = SbpmElementOptions;

export type SbpmProcessModelTransitionOptions = SbpmLinkOptions;

export type SbpmModelerOptions = {
  container: HTMLElement;
};
