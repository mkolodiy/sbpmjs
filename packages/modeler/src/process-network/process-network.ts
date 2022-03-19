import * as joint from 'jointjs';
import type { SbpmElementAttributes, SbpmProcessNetworkOptions } from '../common';
import { SbpmElementType } from '../common';
import SbpmElement from '../element';
import { jointOptions, toolsOptions } from './options';

export function createProcessNetworkOptions(options: SbpmProcessNetworkOptions) {
  const { label, ...restOptions } = options;

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
      },
    },
    initialOptions: joint.util.cloneDeep(options),
    jointOptions,
    toolsOptions,
    type: SbpmElementType.PROCESS_NETWORK,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmProcessNetworkOptions>;
}

export default class SbpmProcessNetwork extends SbpmElement<SbpmProcessNetworkOptions> {
  public update(options: SbpmProcessNetworkOptions) {
    super.update(options);
  }
}
