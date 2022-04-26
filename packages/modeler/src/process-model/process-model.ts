import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmProcessModelOptions } from './types';
import { multiProcessIcon, singleProcessIcon } from './icon';
import type { SbpmModelerOptions } from '../modeler';
import type { SbpmElementToolsOptions } from '../element-tools';
import SbpmElementView from '../element-view';

export function createProcessModelOptions(options: SbpmProcessModelOptions, modelerOptions: SbpmModelerOptions) {
  const { label, processType = 'single', ...restOptions } = options;
  const { onDeleteElement } = modelerOptions;

  const icon = getIcon(processType);

  const additionToolsOptions: SbpmElementToolsOptions = [
    {
      type: 'remove',
      options: {
        action: (_evt: joint.dia.Event, elementView: joint.dia.ElementView, tool: joint.dia.ToolView) => {
          onDeleteElement?.((elementView as SbpmElementView).element);
          (elementView as SbpmElementView).element.remove({ ui: true, tool: tool.cid });
        },
      },
    },
  ];

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
    toolsOptions: joint.util.merge(toolsOptions, additionToolsOptions),
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
