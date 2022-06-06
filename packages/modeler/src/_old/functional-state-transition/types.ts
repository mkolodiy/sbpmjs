import SbpmFunctionState from '../function-state';
import type { SbpmLinkOptions } from '../link';
import SbpmReceiveState from '../receive-state';
import SbpmSendState from '../send-state';

export type SbpmFunctionStateTransitionOptions = SbpmLinkOptions<SbpmFunctionState, SbpmSendState | SbpmReceiveState> & {
  label: string;
};
