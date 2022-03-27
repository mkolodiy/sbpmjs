import { SVG_PREFIX } from './constants';

export const createIcon = (template: string) => {
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
};
