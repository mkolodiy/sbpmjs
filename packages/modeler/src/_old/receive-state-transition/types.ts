import SbpmFunctionState from '../function-state';
import type { SbpmLinkOptions } from '../link';
import SbpmReceiveState from '../receive-state';
import SbpmSendState from '../send-state';

export type SbpmReceiveStateTransitionOptions = SbpmLinkOptions<SbpmReceiveState, SbpmFunctionState | SbpmSendState> & {
  sender: string;
  message: string;
};
