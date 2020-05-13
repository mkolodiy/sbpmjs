import * as joint from 'jointjs';

import { deleteIcon, callMadeIcon, openInNewIcon } from '../common/icons';
import { ButtonOptions, ElementToolsOptions } from '../common/types';

/**
 * Creates element tools.
 *
 * @param options [[ElementToolsOptions]] object.
 * @returns A new tools view.
 */
export const createElementTools = (
  options: ElementToolsOptions,
  paper: joint.dia.Paper
) => {
  const {
    removeButtonOptions,
    openInNewButtonOptions,
    linkButtonOptions
  } = options;

  const tools = [];
  tools.push(createBoundaryTool());

  if (removeButtonOptions) {
    tools.push(createRemoveButton(removeButtonOptions));
  }

  if (openInNewButtonOptions) {
    tools.push(createOpenInNewButton(openInNewButtonOptions));
  }

  if (linkButtonOptions) {
    tools.push(createLinkButton(linkButtonOptions, paper));
  }

  const toolsView = new joint.dia.ToolsView({
    name: 'elementTools',
    tools
  });

  return toolsView;
};

const createBoundaryTool = () => {
  return new joint.elementTools.Boundary({
    focusOpacity: 1,
    useModelGeometry: true
  });
};

const createRemoveButton = (options: ButtonOptions) => {
  const { coordinates } = options;
  return new joint.elementTools.Remove({
    rotate: true,
    x: coordinates.x,
    y: coordinates.y,
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': deleteIcon,
          cursor: 'pointer'
        }
      }
    ]
  });
};

const createOpenInNewButton = (options: ButtonOptions) => {
  const { coordinates } = options;
  return new joint.elementTools.Button({
    x: coordinates.x,
    y: coordinates.y,
    action: function(evt) {},
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': openInNewIcon,
          cursor: 'pointer'
        }
      }
    ]
  });
};

const createLinkButton = (options: ButtonOptions, paper: joint.dia.Paper) => {
  const { coordinates, event } = options;
  return new joint.elementTools.Button({
    x: coordinates.x,
    y: coordinates.y,
    action: (evt: joint.dia.Event, view: joint.dia.CellView) => {
      paper.trigger(event, evt, view);
    },
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': callMadeIcon,
          cursor: 'pointer'
        }
      }
    ]
  });
};
