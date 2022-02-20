import * as joint from 'jointjs';
import type { SbpmBoundaryToolOptions, SbpmElementToolsOptions } from '../common';
import { defaultBoundaryOptions, defaultButtonOptions, defaultRemoveOptions } from './options';

export function createElementTools(toolsOptions: SbpmElementToolsOptions) {
  const tools = [];

  const boundaryToolOptions = toolsOptions.find((toolOptions) => toolOptions.type === 'boundary') ?? ({} as SbpmBoundaryToolOptions);
  tools.push(createBoundary(boundaryToolOptions.options));

  for (const toolOptions of toolsOptions) {
    if (toolOptions.type === 'button') {
      tools.push(createButton(toolOptions.options));
    }

    if (toolOptions.type === 'remove') {
      tools.push(createRemove(toolOptions.options));
    }
  }

  const toolsView = new joint.dia.ToolsView({
    tools,
  });

  return toolsView;
}

function createBoundary(options: joint.elementTools.Boundary.Options) {
  return new joint.elementTools.Boundary(joint.util.merge(joint.util.cloneDeep(defaultBoundaryOptions), options));
}

function createButton(options: joint.elementTools.Button.Options) {
  return new joint.elementTools.Button(joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), options));
}

function createRemove(options: joint.elementTools.Button.Options) {
  return new joint.elementTools.Remove(joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options));
}
