import SbpmFunctionState from '../function-state';
import type { SbpmLinkOptions } from '../link';
import SbpmReceiveState from '../receive-state';
import SbpmSendState from '../send-state';

export type SbpmSendStateTransitionOptions = SbpmLinkOptions<SbpmSendState, SbpmFunctionState | SbpmReceiveState> & {
  sender: string;
  message: string;
};
