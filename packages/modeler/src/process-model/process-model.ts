import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmProcessModelOptions } from './types';
import { multiProcessIcon, singleProcessIcon } from './icon';

export function createProcessModelOptions(options: SbpmProcessModelOptions) {
  const { label, processType = 'single', ...restOptions } = options;

  const icon = getIcon(processType);

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
      },
      image: {
        xlinkHref: icon,
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
    const { processType, ...restOptions } = options;

    if (processType) {
      const icon = getIcon(processType);
      this.attr('image/xlinkHref', icon);
    }

    super.update(restOptions);
  }
}

function getIcon(processType: string) {
  return processType === 'single' ? singleProcessIcon : multiProcessIcon;
}
