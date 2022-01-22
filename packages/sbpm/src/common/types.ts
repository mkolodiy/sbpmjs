import { SbpmType } from './constants';

interface SbpmElement {
  id: string;
  type: typeof SbpmType;
  label: string;
}

export interface SbpmProcessGroup extends SbpmElement {
  contains: SbpmElement[];
}

export interface SbpmProcessModel extends SbpmElement {
  contains: SbpmElement[];
}

export interface SbpmStandardLayer extends SbpmElement {
  implements: SbpmElement;
  initialElement: SbpmElement;
  contains: SbpmElement[];
}

export interface SbpmExtensionLayer extends SbpmElement {
  extends: SbpmElement;
  contains: SbpmElement[];
}

export interface SbpmExtensionLayer extends SbpmElement {
  contains: SbpmElement[];
}
