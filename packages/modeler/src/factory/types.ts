import type { SbpmElementOptions } from '../element';
import SbpmProcessNetwork from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';

export type OptionsType<T> = T extends SbpmProcessNetwork ? SbpmProcessNetworkOptions : SbpmElementOptions; 