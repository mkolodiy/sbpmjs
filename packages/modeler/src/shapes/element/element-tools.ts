import * as joint from 'jointjs';
import { deleteIcon, touchAppIcon } from '../../common/icons';
import type { SbpmBoundaryToolOptions, SbpmElementToolsOptions } from '../../common/types';

const defaultBoundaryOptions: joint.elementTools.Boundary.Options = {
  focusOpacity: 1,
  useModelGeometry: true,
  padding: 5,
};

const defaultButtonOptions: joint.elementTools.Button.Options = {
  y: -5,
  markup: [
    {
      tagName: 'image',
      attributes: {
        'xlink:href': touchAppIcon,
        cursor: 'pointer',
      },
    },
    {
      tagName: 'title',
      textContent: 'New button with no action',
    },
  ],
};

const defaultRemoveOptions: joint.elementTools.Button.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
    {
      tagName: 'image',
      attributes: {
        'xlink:href': deleteIcon,
      },
    },
    {
      tagName: 'title',
      textContent: 'Remove',
    },
  ],
});

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
    name: 'elementTools',
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
