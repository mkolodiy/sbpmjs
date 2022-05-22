import { GetUpdateOptions } from '../common';
import type { SbpmElementOptions } from '../element';
import type { SbpmLinkOptions } from '../link';
import SbpmProcessNetwork from '../process-network';
import type { SbpmProcessNetworkOptions } from '../process-network';
import SbpmProcessModel from '../process-model';
import type { SbpmProcessModelOptions } from '../process-model';
import SbpmProcessTransition from '../process-transition';
import type { SbpmProcessTransitionOptions } from '../process-transition';
import SbpmSubject from '../subject';
import type { SbpmSubjectOptions } from '../subject';
import SbpmFunctionState from '../function-state';
import type { SbpmFunctionStateOptions } from '../function-state';

type GetElementOptionsType<T> = T extends SbpmProcessNetwork
  ? SbpmProcessNetworkOptions
  : T extends SbpmProcessModel
  ? SbpmProcessModelOptions
  : T extends SbpmSubject
  ? SbpmSubjectOptions
  : T extends SbpmFunctionState
  ? SbpmFunctionStateOptions
  : SbpmElementOptions;

export type ElementOptionsType<T> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T> = T extends SbpmProcessTransition ? SbpmProcessTransitionOptions : SbpmLinkOptions;

export type LinkOptionsType<T> = GetUpdateOptions<GetLinkOptionsType<T>>;
