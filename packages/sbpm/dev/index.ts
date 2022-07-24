import Sbpm from '../src';

import { constructSbpmElementItem, constructSbpmLinkItem, constructSbpmProcess } from '@sbpmjs/shared';

const processNetwork01 = constructSbpmElementItem({
  type: 'ProcessNetwork',
  properties: {
    id: 'processNetwork01',
    label: 'Process network - Test',
    position: {
      x: 300,
      y: 100,
    },
  },
});

const processModel01 = constructSbpmElementItem({
  type: 'ProcessModel',
  properties: {
    id: 'processModel01',
    label: 'Process model',
    position: {
      x: 900,
      y: 100,
    },
    contains: ['subject01', 'subject02', 'messageTransition01'],
  },
});

const processTransition01 = constructSbpmLinkItem({
  type: 'ProcessTransition',
  properties: {
    id: 'processTransition01',
    label: 'Process transition',
    source: 'processNetwork01',
    target: 'processModel01',
  },
});

const subject01 = constructSbpmElementItem({
  type: 'Subject',
  properties: {
    id: 'subject01',
    label: 'Subject 1',
    position: {
      x: 100,
      y: 100,
    },
  },
});

const subject02 = constructSbpmElementItem({
  type: 'Subject',
  properties: {
    id: 'subject02',
    label: 'Subject 2',
    position: {
      x: 600,
      y: 100,
    },
  },
});

const message01 = constructSbpmElementItem({
  type: 'Message',
  properties: {
    id: 'message01',
    label: 'Message 1',
    position: {
      x: 300,
      y: 100,
    },
  },
});

const messageTransition01 = constructSbpmLinkItem({
  type: 'MessageTransition',
  properties: {
    id: 'messageTransition01',
    label: 'Message transition',
    source: 'subject01',
    target: 'subject02',
    contains: ['message01'],
  },
});

// export const process = [processNetwork01, processModel01, processTransition01, subject01, subject02, messageTransition01];

const process = constructSbpmProcess([processNetwork01, processModel01, processTransition01, subject01, subject02, message01, messageTransition01]);

const sbpm = new Sbpm({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  container: document.getElementById('container')!,
});

sbpm.loadProcess(process);
