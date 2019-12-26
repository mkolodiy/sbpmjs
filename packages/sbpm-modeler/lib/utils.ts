import { isPlainObject, isEmpty } from 'lodash';

/**
 * Checks if a value is an object and if it has values in it.
 *
 * @param obj An object that should be validated.
 */
export const isValidObject = (obj: any) => {
  return isPlainObject(obj) && !isEmpty(obj);
};
