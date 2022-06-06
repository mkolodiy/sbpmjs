import type { SbpmElementOptions } from '../element';

export type SbpmProcessModelOptions = SbpmElementOptions & {
  processType?: 'single' | 'multi';
};
