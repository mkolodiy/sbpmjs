import { shapes, elementTools, dia } from 'jointjs';
import { merge } from 'lodash';
import { iconTemplate } from './icon';

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-";

export const icon = `data:image/svg+xml;utf8,${encodeURIComponent(iconTemplate)}`;

export const deleteIcon = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
)}`;

export const elementOptions: shapes.standard.ImageAttributes = {
  size: {
    width: 130,
    height: 130,
  },
  attrs: {
    image: {
      width: 130,
      height: 130,
      cursor: 'pointer',
      xlinkHref: icon,
    },
    label: {
      textWrap: {
        width: 130,
      },
      text: 'Process network 1',
      fontFamily: fontFamily,
      pointerEvents: 'none',
    },
  },
};

export function getProcessNetworkOptions(options: any, representationalOptions?: any) {
  const { label } = options;
  const { position } = representationalOptions;

  return merge(elementOptions, {
    attrs: {
      label: {
        text: label,
      },
      options,
      jointOptions: elementOptions,
      toolsOptions: {},
    },
    position,
    type: 'custom',
  });
}

export function tools() {
  const boundary = new elementTools.Boundary({
    focusOpacity: 1,
    useModelGeometry: true,
    padding: 5,
  });

  const remove = new elementTools.Remove({
    rotate: true,
    x: 140,
    y: -5,
    markup: [
      {
        tagName: 'image',
        attributes: {
          'xlink:href': deleteIcon,
          cursor: 'pointer',
        },
      },
    ],
    useModelGeometry: true,
  });

  return new dia.ToolsView({
    tools: [boundary, remove],
  });
}
