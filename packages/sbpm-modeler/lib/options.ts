/**
 * Default options used to create a new paper instance.
 */
export const paperDefaults = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0
  }
};

export const standardSubjectHumanDefaults = {
  size: {
    width: 90,
    height: 140
  },
  attrs: {
    image: {
      width: 90,
      height: 140,
      cursor: 'pointer'
    },
    text: {
      textWrap: {
        width: 150
      },
      xAlignment: '-60%',
      yAlignment: -90,
      pointerEvents: 'none',
      fontWeight: 'bold',
      lineHeight: 18
    }
  }
};
