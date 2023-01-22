import {
  StateOptions,
  ElementCreationOptions,
  StateUpdateOptions
} from '../../../common/types';
import { ShapeType } from '../../../common/constants';
import { getJointOptions, toolsOptions } from './options';
import { createStateUpdateOptions } from '../../common/elements';

/**
 * Creates send state creation options.
 *
 * @param options [[StateOptions]] object.
 */
export const createSendStateOptions = (
  options: StateOptions
): ElementCreationOptions<StateOptions> => {
  return {
    jointOptions: getJointOptions(options),
    options,
    type: ShapeType.SEND_STATE,
    toolsOptions
  };
};

export const createSendStateUpdateOptions = (options: StateUpdateOptions) => {
  const jointOptions = getJointOptions(options);
  return createStateUpdateOptions(options, jointOptions);
};
