import * as joint from 'jointjs';
import { autoRenewIcon, createJointType } from '../common';
import type { GetUpdateOptions, SbpmProcessTransitionType } from '../common';
import { SbpmLink, SbpmLinkView, addActionsToLinkToolsOptions } from '../core';
import type { SbpmLinkAttributes, SbpmLinkToolsOptions, SbpmLinkOptions } from '../core';
import { SbpmProcessNetwork } from './process-network';
import type { SbpmModelerOptions } from '../canvas';
import { SbpmProcessModel } from './process-model';

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

export type SbpmProcessTransitionOptions = SbpmLinkOptions<SbpmProcessNetwork | SbpmProcessModel, SbpmProcessModel>;

export class SbpmProcessTransition extends SbpmLink {
  type: SbpmProcessTransitionType = 'ProcessTransition';

  constructor(options: SbpmProcessTransitionOptions = {} as SbpmProcessTransitionOptions, modelerOptions: SbpmModelerOptions = {} as SbpmModelerOptions) {
    const attributes = joint.util.merge(
      {},
      {
        toolsOptions: addActionsToLinkToolsOptions(toolsOptions, modelerOptions),
        type: createJointType('sbpm.pnd', 'ProcessTransition'),
        ...options,
      }
    ) as SbpmLinkAttributes;

    super(attributes);
  }

  public update(options: GetUpdateOptions<SbpmProcessTransitionOptions>) {
    super.update(options);
  }
}
