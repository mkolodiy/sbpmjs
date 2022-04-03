import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmProcessModelOptions } from './types';

export function createProcessModelOptions(options: SbpmProcessModelOptions) {
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
    type: SbpmElementType.PROCESS_MODEL,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmProcessModelOptions>;
}

export default class SbpmProcessModel extends SbpmElement<SbpmProcessModelOptions> {
  type: typeof SbpmElementType.PROCESS_MODEL = SbpmElementType.PROCESS_MODEL;

  public update(options: GetUpdateOptions<SbpmProcessModelOptions>) {
    super.update(options);
  }
}
