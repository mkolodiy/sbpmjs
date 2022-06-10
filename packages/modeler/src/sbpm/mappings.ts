import { SbpmElementType, SbpmLinkType } from '../common';
import { SbpmProcessNetwork } from './process-network';
import { SbpmProcessTransition } from './process-transition';

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
