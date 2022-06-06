import type { SbpmElementOptions } from '../element';

export type SbpmSubjectOptions = SbpmElementOptions & {
  type?: 'human' | 'machine';
};
