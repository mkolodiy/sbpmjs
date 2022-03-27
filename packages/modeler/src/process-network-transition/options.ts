import * as joint from 'jointjs';
import { autoRenewIcon } from '../common';
import type { SbpmLinkToolsOptions } from '../link-tools';

export const toolsOptions: SbpmLinkToolsOptions = [
  {
    type: 'remove',
    options: {
      distance: 60,
    },
  },
  {
    type: 'button',
    options: {
      distance: 84,
      action: (_evt: joint.dia.Event, view: joint.dia.LinkView, _tool: joint.dia.ToolView) => {
        //@ts-ignore
        view.link.resetVertices();
      },
      markup: [
        {
          tagName: 'rect',
        },
        {
          tagName: 'image',
          attributes: {
            'xlink:href': autoRenewIcon,
            event: 'link:removeVertices',
          },
        },
        {
          tagName: 'title',
          textContent: 'Reset vertices',
        },
      ],
    },
  },
];
