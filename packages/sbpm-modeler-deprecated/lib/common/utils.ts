import { SVG_PREFIX, ShapeNamespace } from './constants';
import { GenericOptions } from './types';

/**
 * Combine multiple strings in an array separated by separator.
 *
 * @param strings List with strings that should be combined.
 * @param separator Separator which should be use to combine the strings.
 */
export const combineStrings = (strings: string[], separator: string = ' ') => {
  return strings.join(separator);
};

/**
 * Creates a new icon.
 *
 * @param template SVG icon template.
 */
export const createIcon = (template: string) => {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
};

/**
 * Check if a shape is of common type.
 *
 * @param type Type of a shape.
 */
export const isCommonType = (type: string) => {
  return type.includes(ShapeNamespace.COMMON);
};

/**
 * No operation function.
 */
export const noop = () => {};

export const flattenObject = (
  object: GenericOptions,
  prefix: string = '',
  result: GenericOptions = {}
): GenericOptions => {
  if (
    typeof object === 'string' ||
    typeof object === 'number' ||
    typeof object === 'boolean'
  ) {
    result[prefix] = object;
    return result;
  }

  if (typeof object === 'object') {
    for (let i in object) {
      let pref = prefix;
      if (!prefix) {
        pref = i;
      } else {
        pref = prefix + '/' + i;
      }

      flattenObject(object[i], pref, result);
    }
    return result;
  }

  return result;
};
