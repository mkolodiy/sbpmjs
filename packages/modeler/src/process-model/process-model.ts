import * as joint from 'jointjs';
import { SbpmElementType } from '../common';
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
  public update(options: SbpmProcessModelOptions) {
    super.update(options);
  }
}
