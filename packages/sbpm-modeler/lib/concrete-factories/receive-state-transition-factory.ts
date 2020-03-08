import * as joint from 'jointjs';

import { Errors, CustomEvents, Shapes } from '../constants';
import LinkFactory from '../factories/link-factory';
import { ILabelBasedLinkToolsOptions } from '../types';

/**
 * Default options used to create a send state transition.
 */
const sendStateTransitionDefaults = {
  attrs: {
    wrapper: {
      pointerEvents: 'none'
    }
  }
};

const labelBasedLinkToolsDefaults: ILabelBasedLinkToolsOptions = {
  selectionLabelOptions: {
    width: 195,
    height: 75
  },
  removeLabelOptions: {
    xAlignment: 103,
    yAlignment: -40
  },
  removeVerticesLabelOptions: {
    xAlignment: 128,
    yAlignment: -40
  }
};

export default class ReceiveStateTransitionFactory extends LinkFactory {
  private static _instance: ReceiveStateTransitionFactory;

  /**
   * Creates a new [[ReceiveStateTransitionFactory]] instance.
   *
   * @param container HTML element where the canvas will be rendered.
   * @returns [[ReceiveStateTransitionFactory]] instance.
   * @throws Error when the [[ReceiveStateTransitionFactory]] instance is already initialized.
   */
  public static initialize(container: Element): ReceiveStateTransitionFactory {
    if (!ReceiveStateTransitionFactory._instance) {
      ReceiveStateTransitionFactory._instance = new ReceiveStateTransitionFactory(
        container
      );
      return ReceiveStateTransitionFactory._instance;
    }

    throw new Error(Errors.SSTF_INITIALIZATION);
  }

  /**
   * Retrieves the [[ReceiveStateTransitionFactory]] instance.
   *
   * @returns [[ReceiveStateTransitionFactory]] instance.
   * @throws Error when the [[ReceiveStateTransitionFactory]] instance is not initialized.
   */
  public static getInstance(): ReceiveStateTransitionFactory {
    if (!ReceiveStateTransitionFactory._instance) {
      throw new Error(Errors.SSTF_INSTANCE_RETRIEVAL);
    }

    return ReceiveStateTransitionFactory._instance;
  }

  private constructor(container: Element) {
    super(
      container,
      Shapes.RECEIVE_STATE_TRANSITION,
      CustomEvents.ELEMENT_ADD_RECEIVE_STATE_TRANSITION
    );
  }

  protected getLinkDefaults(): {} {
    return sendStateTransitionDefaults;
  }

  /**
   * Adds send state transition icon as a label.
   *
   * @param model Jointjs model of the send state transition.
   */
  protected addIconLabel(model: joint.shapes.standard.Link) {
    const iconLabel = {
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'rect',
          selector: 'header'
        },
        {
          tagName: 'text',
          selector: 'headerText'
        },
        {
          tagName: 'text',
          selector: 'bodyText'
        }
      ],
      attrs: {
        body: {
          width: 180,
          height: 60,
          strokeWidth: 2,
          stroke: '#b3b3b3ff',
          fill: '#FFFFFF',
          xAlignment: 'middle',
          yAlignment: 'middle',
          cursor: 'pointer'
        },
        header: {
          width: 180,
          height: 30,
          strokeWidth: 2,
          stroke: '#b3b3b3ff',
          fill: '#FFFFFF',
          xAlignment: 'middle',
          yAlignment: -30,
          cursor: 'pointer'
        },
        headerText: {
          xAlignment: 'middle',
          yAlignment: -25,
          textWrap: {
            text: 'Subject Test',
            width: 180,
            height: 30
          },
          title: 'Subject Test',
          cursor: 'pointer',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle'
        },
        bodyText: {
          xAlignment: 'middle',
          yAlignment: 5,
          textWrap: {
            text: 'Message Test',
            width: 180,
            height: 30
          },
          title: 'Message Test',
          cursor: 'pointer',
          textVerticalAnchor: 'middle',
          textAnchor: 'middle'
        }
      }
    };

    model.insertLabel(0, iconLabel);
  }

  protected getLabelBasedLinkToolsDefaults(): ILabelBasedLinkToolsOptions {
    return labelBasedLinkToolsDefaults;
  }
}
