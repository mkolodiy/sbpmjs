import { GetUpdateOptions } from '../common';
import type { SbpmElementOptions } from '../element';
import type { SbpmLinkOptions } from '../link';
import SbpmProcessNetwork from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';
import SbpmProcessModel from '../process-model';
import type { SbpmProcessModelOptions } from '../process-model';
import SbpmProcessNetworkTransition from '../process-network-transition';
import type { SbpmProcessModelTransitionOptions } from '../process-network-transition';

type GetElementOptionsType<T> = T extends SbpmProcessNetwork
  ? SbpmProcessNetworkOptions
  : T extends SbpmProcessModel
  ? SbpmProcessModelOptions
  : SbpmElementOptions;

export type ElementOptionsType<T> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T> = T extends SbpmProcessNetworkTransition ? SbpmProcessModelTransitionOptions : SbpmLinkOptions;

export type LinkOptionsType<T> = GetUpdateOptions<GetLinkOptionsType<T>>;
