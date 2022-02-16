import * as joint from 'jointjs';
import { deleteIcon } from './common/icons';

export function createElementTools(toolsOptions: any[]) {
  const tools = [];
  tools.push(createBoundaryTool());

  for (const toolOption of toolsOptions) {
    if (toolOption.type === 'removeButton') {
      tools.push(createRemoveButton(toolOption));
    }
  }

  const toolsView = new joint.dia.ToolsView({
    name: 'elementTools',
    tools,
  });

  return toolsView;
}

const createBoundaryTool = () => {
  return new joint.elementTools.Boundary({
    focusOpacity: 1,
    useModelGeometry: true,
    padding: 5,
  });
};

function createRemoveButton(toolOption: any) {
  return new joint.elementTools.Remove({
    rotate: true,
    x: toolOption.x,
    y: toolOption.y,
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': deleteIcon,
          cursor: 'pointer',
        },
      },
    ],
  });
}
