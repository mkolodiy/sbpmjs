import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmProcessModelTransitionOptions } from './types';
import { toolsOptions } from './options';

export function createProcessNetworkTransitionOptions(options?: SbpmProcessModelTransitionOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      toolsOptions,
      type: SbpmElementType.PROCESS_NETWORK_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmProcessModelTransitionOptions>;
}

export default class SbpmProcessNetworkTransition extends SbpmLink<SbpmProcessModelTransitionOptions> {
  type: typeof SbpmElementType.PROCESS_NETWORK_TRANSITION = SbpmElementType.PROCESS_NETWORK_TRANSITION;

  public update(options: GetUpdateOptions<SbpmProcessModelTransitionOptions>) {
    super.update(options);
  }
}
