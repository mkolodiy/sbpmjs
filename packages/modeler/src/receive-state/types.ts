import type { SbpmElementOptions } from '../element';

export type SbpReceiveStateOptions = SbpmElementOptions & {
  state?: 'start' | 'end' | 'none';
};
