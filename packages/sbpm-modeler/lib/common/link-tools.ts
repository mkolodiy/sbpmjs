import * as joint from 'jointjs';
import { deleteIcon } from '../icons/delete';
import { autoRenewIcon } from '../icons/auto-renew';
import { CustomEvents } from '../variables';

/**
 * Creates link tools.
 *
 * @param useSourceArrowhead Indicates if SourceArrowhead tool should be used added to link tools.
 * @returns A new tools view.
 */
export const createLinkTools = (useSourceArrowhead: boolean = false) => {
  let tools: any[] = [];

  if (useSourceArrowhead) {
    const sourceArrowhead = new joint.linkTools.SourceArrowhead();
    tools.push(sourceArrowhead);
  }

  const verticesTool = new joint.linkTools.Vertices();
  const segmentsTool = new joint.linkTools.Segments();
  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  tools = tools.concat([verticesTool, segmentsTool, targetArrowhead]);

  return new joint.dia.ToolsView({
    tools
  });
};

/**
 * Create link tools that are not possible to create with standard jointjs functionality. Link tools are created as labels.
 *
 * @returns Array with link tools as labels.
 */
export const createLabelBasedLinkTools = () => {
  const selectionLabel = {
    markup: [
      {
        tagName: 'rect',
        selector: 'selectionLabel'
      }
    ],
    attrs: {
      selectionLabel: {
        cursor: 'pointer',
        width: 100,
        height: 70,
        xAlignment: 'middle',
        yAlignment: 'middle',
        fill: 'none',
        stroke: '#33334F',
        'stroke-width': 0.5,
        strokeDasharray: '5, 5',
        pointerEvents: 'none'
      }
    }
  };

  const removeLabel = {
    markup: [
      {
        tagName: 'image',
        selector: 'removeLabel'
      }
    ],
    attrs: {
      removeLabel: {
        'xlink:href': deleteIcon(),
        cursor: 'pointer',
        width: 24,
        height: 24,
        xAlignment: 52.5,
        yAlignment: -40,
        event: CustomEvents.LINK_REMOVE,
        title: 'Remove element'
      }
    }
  };

  const removeVerticesLabel = {
    markup: [
      {
        tagName: 'image',
        selector: 'removeVerticesLabel'
      }
    ],
    attrs: {
      removeVerticesLabel: {
        'xlink:href': autoRenewIcon(),
        cursor: 'pointer',
        width: 24,
        height: 24,
        xAlignment: 77.5,
        yAlignment: -40,
        title: 'Reset vertices',
        event: 'link:removeVertices'
      }
    }
  };

  return [selectionLabel, removeLabel, removeVerticesLabel];
};

export const createLabelBasedLinkTools1 = () => {
  const selectionLabel = {
    markup: [
      {
        tagName: 'rect',
        selector: 'selectionLabel'
      }
    ],
    attrs: {
      selectionLabel: {
        cursor: 'pointer',
        width: 195,
        height: 75,
        xAlignment: 'middle',
        yAlignment: 'middle',
        fill: 'none',
        stroke: '#33334F',
        'stroke-width': 0.5,
        strokeDasharray: '5, 5',
        pointerEvents: 'none'
      }
    }
  };

  const removeLabel = {
    markup: [
      {
        tagName: 'image',
        selector: 'removeLabel'
      }
    ],
    attrs: {
      removeLabel: {
        'xlink:href': deleteIcon(),
        cursor: 'pointer',
        width: 24,
        height: 24,
        xAlignment: 103,
        yAlignment: -40,
        event: CustomEvents.LINK_REMOVE,
        title: 'Remove element'
      }
    }
  };

  const removeVerticesLabel = {
    markup: [
      {
        tagName: 'image',
        selector: 'removeVerticesLabel'
      }
    ],
    attrs: {
      removeVerticesLabel: {
        'xlink:href': autoRenewIcon(),
        cursor: 'pointer',
        width: 24,
        height: 24,
        xAlignment: 128,
        yAlignment: -40,
        title: 'Reset vertices',
        event: 'link:removeVertices'
      }
    }
  };

  return [removeLabel, selectionLabel, removeVerticesLabel];
};
