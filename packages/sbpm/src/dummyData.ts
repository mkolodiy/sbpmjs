const processNetwork01 = {
  id: 'processNetwork01',
  label: 'Process network - Test',
  position: {
    x: 100,
    y: 100,
  },
  type: 'ProcessNetwork',
};

const processModel01 = {
  id: 'processModel01',
  label: 'Process model',
  position: {
    x: 600,
    y: 100,
  },
  type: 'ProcessModel',
  contains: ['subject01', 'subject02', 'messageTransition01'],
};

const processTransition01 = {
  id: 'processTransition01',
  source: 'processNetwork01',
  target: 'processModel01',
  type: 'ProcessTransition',
};

const subject01 = {
  id: 'subject01',
  label: 'Subject 1',
  position: {
    x: 100,
    y: 100,
  },
  type: 'Subject',
};

const subject02 = {
  id: 'subject02',
  label: 'Subject 2',
  position: {
    x: 600,
    y: 100,
  },
  type: 'Subject',
};

const messageTransition01 = {
  id: 'messageTransition01',
  source: 'subject01',
  target: 'subject02',
  type: 'MessageTransition',
};

export const process = [processNetwork01, processModel01, processTransition01, subject01, subject02, messageTransition01];
