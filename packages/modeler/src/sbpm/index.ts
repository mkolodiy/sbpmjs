import { SbpmElementType } from '../common';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmProcessNetworkOptions } from './process-network';

export const typeToClassMapping = {
  [SbpmElementType.PROCESS_NETWORK]: SbpmProcessNetwork,
} as const;

export type SbpmElementOptions = SbpmProcessNetworkOptions;
