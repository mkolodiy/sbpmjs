export const attrs = {
  line: {
    connection: true,
    stroke: '#333333',
    strokeWidth: 2,
    strokeLinejoin: 'round',
    targetMarker: {
      type: 'path',
      d: 'M 10 -5 0 0 10 5 z',
    },
  },
  wrapper: {
    connection: true,
    strokeWidth: 10,
    strokeLinejoin: 'round',
  },
};

export const markup = [
  {
    tagName: 'path',
    selector: 'wrapper',
    attributes: {
      fill: 'none',
      cursor: 'pointer',
      stroke: 'transparent',
      'stroke-linecap': 'round',
    },
  },
  {
    tagName: 'path',
    selector: 'line',
    attributes: {
      fill: 'none',
      'pointer-events': 'none',
    },
  },
];
