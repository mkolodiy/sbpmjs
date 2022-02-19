import * as joint from 'jointjs';

export interface GenericOptions {
  [key: string]: any;
}

export type SbpmModelerOptions = {
  container: HTMLElement;
};

export type SbpmElementAttributes<T> = joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> & {
  initialOptions: T;
  jointOptions: joint.shapes.standard.ImageAttributes;
  toolsOptions: SbpmElementToolsOptions;
};

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
