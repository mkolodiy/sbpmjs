import { SVG_PREFIX } from '../variables';

export const callMadeIcon = () => {
  const template = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/></svg>`;
  return `${SVG_PREFIX}${encodeURIComponent(template)}`;
};
