import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmProcessNetworkOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createProcessNetworkOptions(options: SbpmProcessNetworkOptions, modelerOptions: SbpmModelerOptions) {
  const { label, ...restOptions } = options;

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
      },
    },
    initialOptions: joint.util.cloneDeep(options),
    jointOptions: joint.util.cloneDeep(jointOptions),
    toolsOptions: addActionsToToolsOptions(toolsOptions, modelerOptions),
    type: SbpmElementType.PROCESS_NETWORK,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmProcessNetworkOptions>;
}

export default class SbpmProcessNetwork extends SbpmElement<SbpmProcessNetworkOptions> {
  type: typeof SbpmElementType.PROCESS_NETWORK = SbpmElementType.PROCESS_NETWORK;

  public update(options: GetUpdateOptions<SbpmProcessNetworkOptions>) {
    super.update(options);
  }
}
