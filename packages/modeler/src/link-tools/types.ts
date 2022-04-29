import * as joint from 'jointjs';

export type SbpmLinkButtonToolOptions = { type: 'button'; options: joint.linkTools.Button.Options };

export type SbpmLinkRemoveToolOptions = { type: 'remove'; options: joint.linkTools.Button.Options };

export type SbpmLinkResetVerticesToolOptions = { type: 'reset-vertices'; options: joint.linkTools.Button.Options };

export type SbpmLinkToolsOptions = (SbpmLinkButtonToolOptions | SbpmLinkRemoveToolOptions | SbpmLinkResetVerticesToolOptions)[];
