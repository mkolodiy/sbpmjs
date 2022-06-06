import * as joint from 'jointjs';
import { SbpmLinkType, autoRenewIcon, createJointType } from '../common';
import type { GetUpdateOptions } from '../common';
import { SbpmLink, SbpmLinkView, addActionsToLinkToolsOptions } from '../core';
import type { SbpmLinkAttributes, SbpmLinkToolsOptions, SbpmLinkOptions } from '../core';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmModelerOptions } from '../canvas';

const toolsOptions: SbpmLinkToolsOptions = [
  {
    type: 'remove',
    options: {
      distance: 60,
    },
  },
  {
    type: 'reset-vertices',
    options: {
      distance: 84,
      action: (_evt: joint.dia.Event, linkView: joint.dia.LinkView) => {
        (linkView as SbpmLinkView).link.resetVertices();
      },
      markup: [
        {
          tagName: 'rect',
        },
        {
          tagName: 'image',
          attributes: {
            'xlink:href': autoRenewIcon,
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

export type SbpmProcessTransitionOptions = SbpmLinkOptions<'ProcessTransition', SbpmProcessNetwork, SbpmProcessNetwork>;

export class SbpmProcessTransition extends SbpmLink {
  type: typeof SbpmLinkType.PROCESS_TRANSITION = SbpmLinkType.PROCESS_TRANSITION;

  constructor(options: SbpmProcessTransitionOptions = {} as SbpmProcessTransitionOptions, modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions) {
    const { type, ...restOptions } = options;

    const attributes = joint.util.merge(
      {},
      {
        toolsOptions: addActionsToLinkToolsOptions(toolsOptions, modelerOptions),
        type: createJointType('sbpm.pnd', type),
        ...restOptions,
      }
    ) as SbpmLinkAttributes;

    super(attributes);

    // this.update(restOptions);
  }

  public update(options: GetUpdateOptions<SbpmProcessTransitionOptions>) {
    super.update(options);
  }
}
