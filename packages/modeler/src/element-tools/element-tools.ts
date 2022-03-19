import * as joint from 'jointjs';
import type { SbpmElementBoundaryToolOptions, SbpmElementToolsOptions } from '../common';
import { defaultBoundaryOptions, defaultButtonOptions, defaultConnectOptions, defaultRemoveOptions } from './options';

export function createElementTools(toolsOptions: SbpmElementToolsOptions) {
  const tools = [];

  const boundaryToolOptions = toolsOptions.find((toolOptions) => toolOptions.type === 'boundary') ?? ({} as SbpmElementBoundaryToolOptions);
  tools.push(createBoundary(boundaryToolOptions.options));

  for (const toolOptions of toolsOptions) {
    if (toolOptions.type === 'button') {
      tools.push(createButton(toolOptions.options));
    }

    if (toolOptions.type === 'connect') {
      tools.push(createConnect(toolOptions.options));
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

function createConnect(options: joint.elementTools.Connect.Options) {
  return new joint.elementTools.Connect(joint.util.merge(joint.util.cloneDeep(defaultConnectOptions), options));
}

function createRemove(options: joint.elementTools.Button.Options) {
  return new joint.elementTools.Remove(joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options));
}
