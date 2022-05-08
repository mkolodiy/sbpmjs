import * as joint from 'jointjs';
import { defaultButtonLabel, defaultButtonOptions, defaultIconLabel, defaultRemoveOptions, defaultSelectionLabel } from './options';
import type { SbpmLinkToolsOptions } from './types';

export function createLinkTools(toolsOptions: SbpmLinkToolsOptions) {
  const tools = [];

  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  const vertices = new joint.linkTools.Vertices();
  const segments = new joint.linkTools.Segments();

  for (const toolOption of toolsOptions) {
    if (toolOption.type === 'button' || toolOption.type === 'reset-vertices') {
      tools.push(createButton(toolOption.options));
    }

    if (toolOption.type === 'remove') {
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

export function createIconLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultIconLabel), options);
}

export function createSelectionLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultSelectionLabel), options);
}

export function createButtonLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultButtonLabel), options);
}
