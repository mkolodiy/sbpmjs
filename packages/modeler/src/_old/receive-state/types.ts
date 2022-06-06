import type { SbpmElementOptions } from '../element';

export type SbpmReceiveStateOptions = SbpmElementOptions & {
  state?: 'start' | 'end' | 'none';
};
