import * as joint from 'jointjs';
import SbpmLinkView from '../link-view';
import { SbpmModelerOptions } from '../modeler';
import type { SbpmLinkToolsOptions } from './types';

export function addActionsToToolsOptions(toolsOptions: SbpmLinkToolsOptions, modelerOptions: SbpmModelerOptions): SbpmLinkToolsOptions {
  const { onDeleteLink } = modelerOptions;
  const toolsOptionsCopy = joint.util.cloneDeep(toolsOptions);

  for (const toolOption of toolsOptionsCopy) {
    if (toolOption.type === 'remove') {
      toolOption.options.action = (_evt: joint.dia.Event, linkView: joint.dia.LinkView, tool: joint.dia.ToolView) => {
        onDeleteLink?.((linkView as SbpmLinkView).link);
        (linkView as SbpmLinkView).link.remove({ ui: true, tool: tool.cid });
      };
    }
  }

  return toolsOptionsCopy;
}
