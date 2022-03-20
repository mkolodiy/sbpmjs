import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmProcessModelTransitionOptions } from './types';

export function createProcessNetworkTransitionOptions(options?: SbpmProcessModelTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      type: SbpmElementType.PROCESS_NETWORK_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmProcessModelTransitionOptions>;
}

export default class SbpmProcessNetworkTransition extends SbpmLink<SbpmProcessModelTransitionOptions> {}
