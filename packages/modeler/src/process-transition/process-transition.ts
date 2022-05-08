import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmLink from '../link';
import type { SbpmLinkAttributes } from '../link';
import type { SbpmProcessTransitionOptions } from './types';
import { toolsOptions } from './options';
import { addActionsToToolsOptions } from '../link-tools';
import type { SbpmModelerOptions } from '../modeler';

export function createProcessTransitionOptions(options?: SbpmProcessTransitionOptions, modelerOptions?: SbpmModelerOptions) {
  return joint.util.merge(
    {},
    {
      initialOptions: joint.util.cloneDeep(options),
      jointOptions: undefined,
      toolsOptions: addActionsToToolsOptions(toolsOptions, modelerOptions || ({} as SbpmModelerOptions)),
      type: SbpmElementType.PROCESS_TRANSITION,
      ...(options ?? {}),
    }
  ) as SbpmLinkAttributes<SbpmProcessTransitionOptions>;
}

export default class SbpmProcessTransition extends SbpmLink<SbpmProcessTransitionOptions> {
  type: typeof SbpmElementType.PROCESS_TRANSITION = SbpmElementType.PROCESS_TRANSITION;

  public update(options: GetUpdateOptions<SbpmProcessTransitionOptions>) {
    super.update(options);
  }
}