import type { GetUpdateOptions } from '../common';
import type { SbpmElementOptions as SbpmElementOptionsCore, SbpmLinkOptions as SbpmLinkOptionsCore } from '../core';
import type { SbpmProcessNetworkOptions } from './process-network';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmProcessTransitionOptions } from './process-transition';
import { SbpmProcessTransition } from './process-transition';

export type SbpmElementOptions = SbpmProcessNetworkOptions;

export type SbpmLinkOptions = SbpmProcessTransitionOptions;

type GetElementOptionsType<T> = T extends SbpmProcessNetwork
  ? SbpmProcessNetworkOptions
  : // : T extends SbpmProcessModel
    // ? SbpmProcessModelOptions
    // : T extends SbpmSubject
    // ? SbpmSubjectOptions
    // : T extends SbpmFunctionState
    // ? SbpmFunctionStateOptions
    SbpmElementOptionsCore;

export type ElementOptionsType<T> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T> = T extends SbpmProcessTransition ? SbpmProcessTransitionOptions : SbpmLinkOptionsCore;

export type LinkOptionsType<T> = GetUpdateOptions<GetLinkOptionsType<T>>;
