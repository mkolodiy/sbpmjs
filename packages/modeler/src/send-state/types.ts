import type { SbpmElementOptions } from '../element';

export type SbpmSendStateOptions = SbpmElementOptions & {
  state?: 'start' | 'end' | 'none';
};
