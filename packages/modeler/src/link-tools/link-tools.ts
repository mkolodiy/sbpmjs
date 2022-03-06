import * as joint from 'jointjs';
import { SbpmLinkToolsOptions } from '../common';

export function createLinkTools(toolsOptions: SbpmLinkToolsOptions) {
  const tools = [];

  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  tools.push(targetArrowhead);

  const toolsView = new joint.dia.ToolsView({
    tools,
  });

  return toolsView;
}
