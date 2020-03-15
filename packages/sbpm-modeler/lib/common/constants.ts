/**
 * Shape namespaces used to check if a shape is SBPM shape.
 */
export enum ShapeNamespace {
  COMMON = 'sbpm.common',
  SID = 'sbpm.sid',
  SBD = 'sbpm.sbd'
}

/**
 * Shape types used to create SBPM shapes.
 */
export enum ShapeType {
  ORIGIN = 'sbpm.common.Origin',
  MESSAGE_TRANSITION = 'sbpm.sid.MessageTransition',
  STANDARD_SUBJECT = 'sbpm.sid.StandardSubject',
  SEND_STATE = 'sbpm.sbd.SendState',
  RECEIVE_STATE = 'sbpm.sbd.ReceiveState',
  FUNCTION_STATE = 'sbpm.sbd.FunctionState',
  SEND_STATE_TRANSITION = 'sbpm.sbd.SendStateTransition',
  RECEIVE_STATE_TRANSITION = 'sbpm.sbd.ReceiveStateTransition',
  FUNCTION_STATE_TRANSITION = 'sbpm.sbd.FunctionStateTransition'
}

/**
 * Joint events.
 */
export enum Event {
  BLANK_POINTERUP = 'blank:pointerup',
  BLANK_POINTERDOWN = 'blank:pointerdown',
  CELL_POINTERUP = 'cell:pointerup',
  CELL_POINTERDOWN = 'cell:pointerdown',
  ELEMENT_POINTERDOWN = 'element:pointerdown',
  LINK_POINTERDOWN = 'link:pointerdown',
  MOUSEMOVE = 'mousemove',
  MOUSEUP = 'mouseup',
  POINTERDOWN = 'pointerdown'
}

/**
 * Custom events.
 */
export enum CustomEvent {
  ELEMENT_ADD_MESSAGE_TRANSITION = 'element:addMessageTransition',
  ELEMENT_ADD_SEND_STATE_TRANSITION = 'element:addSendTransition',
  ELEMENT_ADD_RECEIVE_STATE_TRANSITION = 'element:addReceiveTransition',
  ELEMENT_ADD_FUNCTION_STATE_TRANSITION = 'element:addFunctionTransition',
  LINK_REMOVE = 'link:remove',
  LINK_REMOVE_VERTICES = 'link:removeVertices'
}

/**
 * List of custom events that are triggered by clicking on element link tool.
 */
export const CUSTOM_EVENTS = [
  CustomEvent.ELEMENT_ADD_MESSAGE_TRANSITION,
  CustomEvent.ELEMENT_ADD_SEND_STATE_TRANSITION,
  CustomEvent.ELEMENT_ADD_RECEIVE_STATE_TRANSITION,
  CustomEvent.ELEMENT_ADD_FUNCTION_STATE_TRANSITION
];

export const SVG_PREFIX = 'data:image/svg+xml;utf8,';
