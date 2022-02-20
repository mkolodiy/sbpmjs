import { SVG_PREFIX } from './constants';

export const combineStrings = (strings: string[], separator: string = ' ') => {
  return strings.join(separator);
};

export const createIcon = (template: string) => {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
};
