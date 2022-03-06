import * as joint from 'jointjs';
import { SbpmLinkToolsOptions } from '../common';
import { defaultButtonOptions, defaultRemoveOptions } from './options';

export function createLinkTools(_toolsOptions: SbpmLinkToolsOptions) {
  const tools = [];

  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  const vertices = new joint.linkTools.Vertices();
  const segments = new joint.linkTools.Segments();
  const remove = createRemove({});
  tools.push(targetArrowhead);
  tools.push(vertices);
  tools.push(segments);
  tools.push(remove);

  const toolsView = new joint.dia.ToolsView({
    tools,
  });

  return toolsView;
}

// function createButton(options: joint.elementTools.Button.Options) {
//   return new joint.linkTools.Button(joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), options));
// }

function createRemove(options: joint.elementTools.Button.Options) {
  return new joint.linkTools.Remove(joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options));
}
