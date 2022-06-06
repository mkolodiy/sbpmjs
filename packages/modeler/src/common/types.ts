import { SbpmShapeNamespace, SbpmCommonType, SbpmElementType, SbpmLinkType } from './constants';

export type ValueOf<T> = T[keyof T];

export interface GenericOptions {
  [key: string]: unknown;
}

export type SbpmShapeAttributes<T> = {
  toolsOptions: T;
};

export type SbpmShapeNamespaceKey = ValueOf<typeof SbpmShapeNamespace>;

export type SbpmCommonTypeKey = ValueOf<typeof SbpmCommonType>;

export type SbpmElementTypeKey = ValueOf<typeof SbpmElementType>;

export type SbpmLinkTypeKey = ValueOf<typeof SbpmLinkType>;

export type SbpmShapeTypeKey = SbpmElementTypeKey | SbpmLinkTypeKey;

export type SbpmShapeOptions<T extends SbpmShapeTypeKey = SbpmShapeTypeKey> = {
  type: T;
  id?: string;
};

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;
