import { SbpmShapeNamespace } from './constants';

export type ValueOf<T> = T[keyof T];

export interface GenericOptions {
  [key: string]: unknown;
}

export type SbpmShapeAttributes<T> = {
  toolsOptions: T;
};

export type SbpmOriginType = 'Origin';

export type SbpmShapeNamespaceType = ValueOf<typeof SbpmShapeNamespace>;

export type GetUpdateOptions<T> = Partial<Omit<T, 'id'>>;
