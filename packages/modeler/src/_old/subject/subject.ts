import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { humanTypeJointOptions, machineTypeJointOptions, humanToolsOptions, machineToolsOptions } from './options';
import type { SbpmSubjectOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import { addActionsToToolsOptions } from '../element-tools';

export function createSubjectOptions(options: SbpmSubjectOptions, modelerOptions: SbpmModelerOptions) {
  const { label, type = 'human', ...restOptions } = options;

  const jointOptions = type === 'human' ? humanTypeJointOptions : machineTypeJointOptions;
  const toolsOptions = type === 'human' ? humanToolsOptions : machineToolsOptions;

  return joint.util.merge(jointOptions, {
    attrs: {
      label: {
        text: label,
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
      const jointOptions = type === 'human' ? humanTypeJointOptions : machineTypeJointOptions;
      const toolsOptions = type === 'human' ? humanToolsOptions : machineToolsOptions;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.size(jointOptions.size);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.attr('image/xlinkHref', jointOptions.attrs?.image.xlinkHref);
      this.attr('image/width', jointOptions.attrs?.image?.width);
      this.attr('image/height', jointOptions.attrs?.image?.height);
      this.attr('image/height', jointOptions.attrs?.image?.height);
      this.prop('toolsOptions', toolsOptions);
    }

    super.update(restOptions);
  }
}
