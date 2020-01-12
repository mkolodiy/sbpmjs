import * as joint from 'jointjs';
import { deleteIcon } from '../icons/delete';
import { autoRenewIcon } from '../icons/auto-renew';
import { CustomEvents } from '../variables';

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

export const createLabelBasedLinkTools = () => {
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
        yAlignment: -82.5,
        event: CustomEvents.LINK_REMOVE
      }
    }
  };

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
        yAlignment: -80,
        fill: 'none',
        stroke: '#33334F',
        'stroke-width': 0.5,
        strokeDasharray: '5, 5',
        pointerEvents: 'none'
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
        xAlignment: 72.5,
        yAlignment: -82.5,
        title: 'Reset vertices',
        event: 'link:removeVertices'
      }
    }
  };

  return [removeLabel, selectionLabel, removeVerticesLabel];
};
