import type { SbpmElementOptions } from '../element';

export type SbpmFunctionStateOptions = SbpmElementOptions & {
  state?: 'start' | 'end' | 'none';
};
