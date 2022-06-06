export const attrs = {
  image: {
    refWidth: '100%',
    refHeight: '100%',
  },
  label: {
    textVerticalAnchor: 'top',
    textAnchor: 'middle',
    refX: '50%',
    refY: '100%',
    refY2: 10,
    fontSize: 14,
    fill: '#333333',
  },
};

export const markup = [
  {
    tagName: 'image',
    selector: 'image',
  },
  {
    tagName: 'text',
    selector: 'label',
  },
];
