import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmSubjectOptions } from './types';
import { humanSubjectIcon, machineSubjectIcon } from './icon';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createSubjectOptions(options: SbpmSubjectOptions, modelerOptions: SbpmModelerOptions) {
  const { label, type = 'human', ...restOptions } = options;

  const icon = getIcon(type);

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
    jointOptions: joint.util.cloneDeep(jointOptions),
    toolsOptions: addActionsToToolsOptions(toolsOptions, modelerOptions),
    type: SbpmElementType.SUBJECT,
    ...restOptions,
  }) as SbpmElementAttributes<SbpmSubjectOptions>;
}

export default class SbpmSubject extends SbpmElement<SbpmSubjectOptions> {
  type: typeof SbpmElementType.SUBJECT = SbpmElementType.SUBJECT;

  public update(options: GetUpdateOptions<SbpmSubjectOptions>) {
    const { type, ...restOptions } = options;

    if (type) {
      const icon = getIcon(type);
      this.attr('image/xlinkHref', icon);
    }

    super.update(restOptions);
  }
}

function getIcon(type: string) {
  return type === 'human' ? humanSubjectIcon : machineSubjectIcon;
}
