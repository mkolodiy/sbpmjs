import { createSbpmGeneralEntityItem } from '@sbpmjs/shared';
import { createRandomUUID } from '../common/utils';

export const defaultProcess = createSbpmGeneralEntityItem({
  type: 'Process',
  properties: {
    id: createRandomUUID(),
    label: 'Default process',
    contains: [],
  },
});
