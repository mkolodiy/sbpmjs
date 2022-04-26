import * as joint from 'jointjs';
import { GetUpdateOptions, SbpmElementType } from '../common';
import SbpmElement from '../element';
import type { SbpmElementAttributes } from '../element';
import { jointOptions, toolsOptions } from './options';
import type { SbpmProcessNetworkOptions } from './types';
import type { SbpmModelerOptions } from '../modeler';
import SbpmElementView from '../element-view';
import type { SbpmElementToolsOptions } from '../element-tools';

export function createProcessNetworkOptions(options: SbpmProcessNetworkOptions, modelerOptions: SbpmModelerOptions) {
  const { label, ...restOptions } = options;
  const { onDeleteElement } = modelerOptions;

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
    },
    initialOptions: joint.util.cloneDeep(options),
    jointOptions: joint.util.cloneDeep(jointOptions),
    toolsOptions: joint.util.merge(toolsOptions, additionToolsOptions),
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
