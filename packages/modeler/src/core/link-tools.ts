import * as joint from 'jointjs';
import { deleteIcon, touchAppIcon } from '../common';

const defaultButtonOptions: joint.linkTools.Button.Options = {
  markup: [
    {
      tagName: 'rect',
      attributes: {
        fill: 'white',
        width: '24px',
        height: '24px',
        rx: 1,
        ry: 1,
      },
    },
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

const defaultRemoveOptions: joint.linkTools.Button.Options = joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
  markup: [
    {},
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

const defaultIconLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'image',
      selector: 'iconLabel',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  attrs: {
    iconLabel: {
      cursor: 'pointer',
      xAlignment: 'middle',
      yAlignment: 'middle',
    },
    text: {
      xAlignment: 'middle',
      yAlignment: 'middle',
      textWrap: {
        height: 180,
      },
      textVerticalAnchor: 'middle',
      textAnchor: 'middle',
    },
  },
};

const defaultSelectionLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'selectionLabel',
    },
  ],
  attrs: {
    selectionLabel: {
      cursor: 'pointer',
      xAlignment: 'middle',
      yAlignment: 'middle',
      fill: 'none',
      stroke: '#33334F',
      'stroke-width': 0.5,
      strokeDasharray: '5, 5',
      pointerEvents: 'none',
    },
  },
};

const defaultButtonLabel: joint.dia.Link.Label = {
  markup: [
    {
      tagName: 'rect',
      selector: 'background',
    },
    {
      tagName: 'image',
      selector: 'buttonLabel',
    },
  ],
  attrs: {
    background: {
      fill: 'white',
      width: '24px',
      height: '24px',
      rx: 1,
      ry: 1,
    },
    buttonLabel: {
      cursor: 'pointer',
      width: 24,
      height: 24,
      title: 'New button with no action',
    },
  },
};

export type SbpmLinkButtonToolOptions = { type: 'button'; options: joint.linkTools.Button.Options };

export type SbpmLinkRemoveToolOptions = { type: 'remove'; options: joint.linkTools.Button.Options };

export type SbpmLinkOpenToolOptions = { type: 'open'; options: joint.linkTools.Button.Options };

export type SbpmLinkResetVerticesToolOptions = { type: 'reset-vertices'; options: joint.linkTools.Button.Options };

export type SbpmLinkToolsOptions = (SbpmLinkButtonToolOptions | SbpmLinkRemoveToolOptions | SbpmLinkOpenToolOptions | SbpmLinkResetVerticesToolOptions)[];

export type SbpmLinkLabelToolsOptions = {
  iconLabel: joint.dia.Link.Label;
  selectionLabel: joint.dia.Link.Label;
  removeLabel: joint.dia.Link.Label;
  removeVerticesLabel: joint.dia.Link.Label;
};

function createButton(options: joint.linkTools.Button.Options) {
  return new joint.linkTools.Button(joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), options));
}

function createRemove(options: joint.linkTools.Button.Options) {
  return new joint.linkTools.Remove(joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options));
}

export function createIconLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultIconLabel), options);
}

export function createSelectionLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultSelectionLabel), options);
}

export function createButtonLabel(options: joint.dia.Link.Label) {
  return joint.util.merge(joint.util.cloneDeep(defaultButtonLabel), options);
}

export function createLinkTools(toolsOptions: SbpmLinkToolsOptions) {
  const tools = [];

  const targetArrowhead = new joint.linkTools.TargetArrowhead();
  const vertices = new joint.linkTools.Vertices();
  const segments = new joint.linkTools.Segments();

  for (const toolOption of toolsOptions) {
    if (toolOption.type === 'button' || toolOption.type === 'reset-vertices') {
      tools.push(createButton(toolOption.options));
    }

    if (toolOption.type === 'remove') {
      tools.push(createRemove(toolOption.options));
    }
  }

  tools.push(targetArrowhead);
  tools.push(vertices);
  tools.push(segments);

  const toolsView = new joint.dia.ToolsView({
    tools,
  });

  return toolsView;
}
