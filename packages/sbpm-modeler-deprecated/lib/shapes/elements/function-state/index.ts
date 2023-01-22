import {
  StateOptions,
  ElementCreationOptions,
  StateUpdateOptions
} from '../../../common/types';
import { ShapeType } from '../../../common/constants';
import { getJointOptions, toolsOptions } from './options';
import { createStateUpdateOptions } from '../../common/elements';

/**
 * Creates function state creation options.
 *
 * @param options [[StateOptions]] object.
 */
export const createFunctionStateOptions = (
  options: StateOptions
): ElementCreationOptions<StateOptions> => {
  return {
    jointOptions: getJointOptions(options),
    options,
    type: ShapeType.FUNCTION_STATE,
    toolsOptions
  };
};

export const createFunctionStateUpdateOptions = (
  options: StateUpdateOptions
) => {
  const jointOptions = getJointOptions(options);
  return createStateUpdateOptions(options, jointOptions);
};
