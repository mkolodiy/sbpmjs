import { SVG_PREFIX, SbpmShapeNamespace } from './constants';

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
  return type.includes(SbpmShapeNamespace.COMMON);
};
