import SbpmModeler from '../src';

const modeler = new SbpmModeler({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  container: document.getElementById('container')!,
  onSelectElement: (element) => {
    console.log('onSelectElement', element);
  },
  onSelectLink: (link) => {
    console.log('onSelectLink', link);
  },
  onDeleteElement: (element) => {
    console.log('onDeleteElement', element);
  },
  onDeleteLink: (link) => {
    console.log('onDeleteLink', link);
  },
  onOpenElement: (element) => {
    console.log('onOpenElement', element);
  },
  onOpenLink: (link) => {
    console.log('onOpenLink', link);
  },
});

modeler.addSbpmElement({
  type: 'ProcessNetwork',
  properties: {
    id: 'pn1',
    label: 'pn1',
    position: {
      x: 100,
      y: 100,
    },
  },
});

modeler.addSbpmElement({
  type: 'ProcessModel',
  properties: {
    id: 'pm1',
    label: 'pm1',
    position: {
      x: 500,
      y: 100,
    },
  },
});

modeler.addSbpmElement({
  type: 'ProcessModel',
  properties: {
    id: 'pm2',
    label: 'pm2',
    position: {
      x: 900,
      y: 100,
    },
    role: 'multi',
  },
});

modeler.addSbpmLink({
  type: 'ProcessTransition',
  properties: {
    id: 'pt1',
    label: 'pt1',
    source: 'pn1',
    target: 'pm1',
  },
});

modeler.addSbpmElement({
  type: 'Subject',
  properties: {
    id: 's1',
    label: 's1',
    position: {
      x: 100,
      y: 300,
    },
  },
});

modeler.addSbpmElement({
  type: 'Subject',
  properties: {
    id: 's2',
    label: 's2',
    position: {
      x: 500,
      y: 300,
    },
  },
});

modeler.addSbpmElement({
  type: 'Message',
  properties: {
    id: 'm1',
    label: 'm1',
    position: {
      x: 900,
      y: 300,
    },
  },
});

modeler.addSbpmLink({
  type: 'MessageTransition',
  properties: {
    id: 'mt1',
    label: 'mt1',
    source: 's1',
    target: 's2',
    role: 'unidirectional',
  },
});

modeler.addSbpmElement({
  type: 'SendState',
  properties: {
    id: 'ss1',
    label: 'ss1',
    position: {
      x: 100,
      y: 600,
    },
  },
});

modeler.addSbpmElement({
  type: 'ReceiveState',
  properties: {
    id: 'rs1',
    label: 'rs1',
    position: {
      x: 900,
      y: 600,
    },
  },
});

modeler.addSbpmElement({
  type: 'FunctionState',
  properties: {
    id: 'fs1',
    label: 'fs1',
    position: {
      x: 500,
      y: 800,
    },
  },
});

modeler.addSbpmLink({
  type: 'SendStateTransition',
  properties: {
    id: 'sst1',
    source: 'ss1',
    target: 'rs1',
    message: 'sst1 message',
    subject: 'sst1 subject',
  },
});

modeler.addSbpmLink({
  type: 'ReceiveStateTransition',
  properties: {
    id: 'rst1',
    source: 'rs1',
    target: 'fs1',
    message: 'rst1 message',
    subject: 'rst1 subject',
  },
});

modeler.addSbpmLink({
  type: 'FunctionStateTransition',
  properties: {
    id: 'fst1',
    source: 'fs1',
    target: 'ss1',
    message: 'fst1 message',
  },
});

document.getElementById('clear-canvas')?.addEventListener('click', () => {
  modeler.canvas.clear();
});

document.getElementById('reset-canvas')?.addEventListener('click', () => {
  modeler.canvas.reset();
});

document.getElementById('restore-view')?.addEventListener('click', () => {
  modeler.restoreView([
    {
      type: 'ProcessNetwork',
      properties: {
        id: 'pn1',
        label: 'pn1',
        position: {
          x: 100,
          y: 100,
        },
      },
    },
    {
      type: 'ProcessModel',
      properties: {
        id: 'pm1',
        label: 'pm1',
        position: {
          x: 500,
          y: 100,
        },
      },
    },
    {
      type: 'ProcessModel',
      properties: {
        id: 'pm2',
        label: 'pm2',
        position: {
          x: 900,
          y: 100,
        },
        role: 'multi',
      },
    },
    {
      type: 'ProcessTransition',
      properties: {
        id: 'pt1',
        label: 'pt1',
        source: 'pn1',
        target: 'pm1',
      },
    },
    {
      type: 'Subject',
      properties: {
        id: 's1',
        label: 's1',
        position: {
          x: 100,
          y: 300,
        },
      },
    },
    {
      type: 'Subject',
      properties: {
        id: 's2',
        label: 's2',
        position: {
          x: 500,
          y: 300,
        },
      },
    },
    {
      type: 'MessageTransition',
      properties: {
        id: 'mt1',
        label: 'mt1',
        source: 's1',
        target: 's2',
        role: 'unidirectional',
      },
    },
    {
      type: 'Message',
      properties: {
        id: 'm1',
        label: 'm1',
        position: {
          x: 900,
          y: 300,
        },
      },
    },
    {
      type: 'SendState',
      properties: {
        id: 'ss1',
        label: 'ss1',
        position: {
          x: 100,
          y: 600,
        },
      },
    },
    {
      type: 'ReceiveState',
      properties: {
        id: 'rs1',
        label: 'rs1',
        position: {
          x: 900,
          y: 600,
        },
      },
    },
    {
      type: 'FunctionState',
      properties: {
        id: 'fs1',
        label: 'fs1',
        position: {
          x: 500,
          y: 800,
        },
      },
    },
    {
      type: 'SendStateTransition',
      properties: {
        id: 'sst1',
        source: 'ss1',
        target: 'rs1',
        message: 'sst1 message',
        subject: 'sst1 subject',
      },
    },
    {
      type: 'ReceiveStateTransition',
      properties: {
        id: 'rst1',
        source: 'rs1',
        target: 'fs1',
        message: 'rst1 message',
        subject: 'rst1 subject',
      },
    },
    {
      type: 'FunctionStateTransition',
      properties: {
        id: 'fst1',
        source: 'fs1',
        target: 'ss1',
        message: 'fst1 message',
      },
    },
  ]);
});
