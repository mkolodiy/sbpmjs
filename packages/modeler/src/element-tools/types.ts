import * as joint from 'jointjs';

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