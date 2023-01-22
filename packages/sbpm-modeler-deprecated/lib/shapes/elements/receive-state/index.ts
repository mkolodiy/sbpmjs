import {
  StateOptions,
  ElementCreationOptions,
  StateUpdateOptions
} from '../../../common/types';
import { ShapeType } from '../../../common/constants';
import { getJointOptions, toolsOptions } from './options';
import { createStateUpdateOptions } from '../../common/elements';

/**
 * Creates receive state creation options.
 *
 * @param options [[StateOptions]] object.
 */
export const createReceiveStateOptions = (
  options: StateOptions
): ElementCreationOptions<StateOptions> => {
  return {
    jointOptions: getJointOptions(options),
    options,
    type: ShapeType.RECEIVE_STATE,
    toolsOptions
  };
};

export const createReceiveStateUpdateOptions = (
  options: StateUpdateOptions
) => {
  const jointOptions = getJointOptions(options);
  return createStateUpdateOptions(options, jointOptions);
};
