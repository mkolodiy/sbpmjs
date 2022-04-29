import * as joint from 'jointjs';
import SbpmElementView from '../element-view';
import { SbpmModelerOptions } from '../modeler';
import type { SbpmElementToolsOptions } from './types';

export function addActionsToToolsOptions(toolsOptions: SbpmElementToolsOptions, modelerOptions: SbpmModelerOptions): SbpmElementToolsOptions {
  const { onDeleteElement, onOpenElement } = modelerOptions;
  const toolsOptionsCopy = joint.util.cloneDeep(toolsOptions);

  for (const toolOption of toolsOptionsCopy) {
    if (toolOption.type === 'remove') {
      toolOption.options.action = (_evt: joint.dia.Event, elementView: joint.dia.ElementView, tool: joint.dia.ToolView) => {
        onDeleteElement?.((elementView as SbpmElementView).element);
        (elementView as SbpmElementView).element.remove({ ui: true, tool: tool.cid });
      };
    }

    if (toolOption.type === 'open') {
      toolOption.options.action = (_evt: joint.dia.Event, elementView: joint.dia.ElementView) => {
        onOpenElement?.((elementView as SbpmElementView).element);
      };
    }
  }

  return toolsOptionsCopy;
}
