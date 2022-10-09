import { createSbpmElementItem, createSbpmGeneralEntityItem } from '@sbpmjs/shared';
import { createRandomUUID } from '../common/utils';

export const defaultProcessNetwork = createSbpmElementItem({
  type: 'ProcessNetwork',
  properties: {
    id: createRandomUUID(),
    label: 'Default process network',
    position: {
      x: 200,
      y: 200,
    },
  },
});

export const defaultProcess = createSbpmGeneralEntityItem({
  type: 'Process',
  properties: {
    id: createRandomUUID(),
    label: 'Default process',
    contains: [defaultProcessNetwork.properties.id],
  },
});
