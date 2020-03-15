import { SVG_PREFIX } from './constants';

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
