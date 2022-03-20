import type { SbpmLinkOptions } from '../link';
import SbpmProcessModel from '../process-model';
import SbpmProcessNetwork from '../process-network';

export type SbpmProcessModelTransitionOptions = SbpmLinkOptions<SbpmProcessNetwork, SbpmProcessModel>;
