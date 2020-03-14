import { isPlainObject, isEmpty } from 'lodash';
import { SVG_PREFIX } from './constants';

/**
 * Checks if a value is an object and if it has values in it.
 *
 * @param obj An object that should be validated.
 */
export const isValidObject = (obj: any) => {
  return isPlainObject(obj) && !isEmpty(obj);
};

/**
 * Combine multiple strings in an array separated by separator.
 *
 * @param strings List with strings that should be combined.
 * @param separator Separator which should be use to combine the strings.
 */
export const combineStrings = (strings: string[], separator: string = ' ') => {
  return strings.join(separator);
};

export const createIcon = (template: string) => {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
};
