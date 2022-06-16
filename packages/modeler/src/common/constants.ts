export const SbpmShapeNamespace = {
  COMMON: 'sbpm.common',
  PND: 'sbpm.pnd',
  SID: 'sbpm.sid',
  SBD: 'sbpm.sbd',
} as const;

export const JointEvent = {
  CELL_POINTERUP: 'cell:pointerup',
  BLANK_POINTERDOWN: 'blank:pointerdown',
  BLANK_POINTERUP: 'blank:pointerup',
  ELEMENT_POINTERDOWN: 'element:pointerdown',
  LINK_POINTERDOWN: 'link:pointerdown',
  LINK_CONNECT: 'link:connect',
} as const;

export const CustomEvent = {
  LINK_REMOVE: 'link:remove',
  LINK_REMOVE_VERTICES: 'link:removeVertices',
  ELEMENT_UPDATED: 'element:updated',
} as const;

export const SVG_PREFIX = 'data:image/svg+xml;utf8,';

export const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-";
