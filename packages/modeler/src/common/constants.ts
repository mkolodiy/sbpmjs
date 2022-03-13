export const SbpmShapeNamespace = {
  COMMON: 'sbpm.common',
  PND: 'sbpm.pnd',
  SID: 'sbpm.sid',
  SBD: 'sbpm.sbd',
} as const;

export const SbpmElementType = {
  ORIGIN: `${SbpmShapeNamespace.COMMON}.Origin`,
  PROCESS_NETWORK: `${SbpmShapeNamespace.PND}.ProcessNetwork`,
};

export const SVG_PREFIX = 'data:image/svg+xml;utf8,';

export const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-";
