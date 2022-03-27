import * as joint from 'jointjs';
import { defaultButtonOptions, defaultRemoveOptions } from './options';
import type { SbpmLinkToolsOptions } from './types';

export function createLinkTools(toolsOptions: SbpmLinkToolsOptions) {
  const tools = [];

  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  const vertices = new joint.linkTools.Vertices();
  const segments = new joint.linkTools.Segments();

  for (const toolOption of toolsOptions) {
    if (toolOption.type === 'button') {
      tools.push(createButton(toolOption.options));
    }

    if (toolOption.type === 'remove') {
      console.log(createRemove(toolOption.options));

      tools.push(createRemove(toolOption.options));
    }
  }

  tools.push(targetArrowhead);
  tools.push(vertices);
  tools.push(segments);

  const toolsView = new joint.dia.ToolsView({
    tools,
  });

  return toolsView;
}

function createButton(options: joint.linkTools.Button.Options) {
  return new joint.linkTools.Button(joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), options));
}

function createRemove(options: joint.linkTools.Button.Options) {
  return new joint.linkTools.Remove(joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options));
}
