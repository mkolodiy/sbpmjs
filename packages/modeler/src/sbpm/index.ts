import { getSbpmType, GetUpdateOptions, SbpmElementType, SbpmLinkType } from '../common';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmProcessNetworkOptions } from './process-network';
import { SbpmProcessTransition } from './process-transition';
import type { SbpmProcessTransitionOptions } from './process-transition';

export const elementTypeToElementClassMapping = {
  [SbpmElementType.PROCESS_NETWORK]: SbpmProcessNetwork,
} as const;

export const linkTypeToLinkClassMapping = {
  [SbpmLinkType.PROCESS_TRANSITION]: SbpmProcessTransition,
} as const;

export const elementTypeToLinkClassMapping = {
  [SbpmElementType.PROCESS_NETWORK]: SbpmProcessTransition,
  // [SbpmElementType.PROCESS_MODEL]: SbpmProcessTransition,
  // [SbpmElementType.SUBJECT]: SbpmProcessTransition,
  // [SbpmElementType.SEND_STATE]: SbpmProcessTransition,
  // [SbpmElementType.RECEIVE_STATE]: SbpmProcessTransition,
  // [SbpmElementType.FUNCTION_STATE]: SbpmProcessTransition,
} as const;

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
    SbpmElementOptions;

export type ElementOptionsType<T> = GetUpdateOptions<GetElementOptionsType<T>>;

type GetLinkOptionsType<T> = T extends SbpmProcessTransition ? SbpmProcessTransitionOptions : SbpmLinkOptions;

export type LinkOptionsType<T> = GetUpdateOptions<GetLinkOptionsType<T>>;

export function getDefaultLink(type: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new elementTypeToLinkClassMapping[getSbpmType(type)]();
}
