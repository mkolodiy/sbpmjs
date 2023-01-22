import {
  ElementCreationOptions,
  SubjectOptions,
  SubjectUpdateOptions
} from '../../../common/types';
import { ShapeType } from '../../../common/constants';
import {
  machineSubjectJointOptions,
  humanSubjectJointOptions,
  machineSubjectToolsOptions,
  humanSubjectToolsOptions
} from './options';
import { getDescriptionProperty } from '../../common/helper';
import { flattenObject } from '../../../common/utils';

/**
 * Creates standard subject creation options.
 *
 * @param options [[SubjectOptions]] object.
 */
export const createStandardSubjectOptions = (
  options: SubjectOptions
): ElementCreationOptions<SubjectOptions> => {
  const { isMachine } = options;
  return {
    jointOptions: getJointOptions(isMachine),
    options,
    type: ShapeType.STANDARD_SUBJECT,
    toolsOptions: getToolsOptions(isMachine)
  };
};

export const createStandardSubjectUpdateOptions = (
  options: SubjectUpdateOptions
) => {
  const { description, isMachine } = options;

  if (isMachine !== undefined) {
    const jointOptions = getJointOptions(isMachine);
    const toolsOptions = getToolsOptions(isMachine);
    return {
      size: jointOptions.size,
      toolsOptions,
      ...getDescriptionProperty(description),
      ...flattenObject({ attrs: jointOptions.attrs })
    };
  }

  return {
    ...getDescriptionProperty(description)
  };
};

const getJointOptions = (isMachine: boolean) => {
  return isMachine ? machineSubjectJointOptions : humanSubjectJointOptions;
};

const getToolsOptions = (isMachine: boolean) => {
  return isMachine ? machineSubjectToolsOptions : humanSubjectToolsOptions;
};
