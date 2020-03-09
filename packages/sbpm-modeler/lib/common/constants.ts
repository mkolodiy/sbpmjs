export enum Error {
  CANVAS_INSTANCE_RETRIEVAL = 'Canvas is not initialized. Please use Canvas.initialize() method to create a new instance of the canvas.',
  CANVAS_INITIALIZATION = 'Canvas is already initialized. Please use Canvas.getInstance() method to retrieve the canvas instance.',
  SSF_INSTANCE_RETRIEVAL = 'StandardSubjectFactory is not initialized. Please use StandardSubjectFactory.initialize() method to create a new instance of the factory.',
  SSF_INITIALIZATION = 'StandardSubjectFactory is already initialized. Please use StandardSubjectFactory.getInstance() method to retrieve the factory instance.',
  MF_INSTANCE_RETRIEVAL = 'MessageFactory is not initialized. Please use MessageFactory.initialize() method to create a new instance of the factory.',
  MF_INITIALIZATION = 'MessageFactory is already initialized. Please use MessageFactory.getInstance() method to retrieve the factory instance.',
  INITIALIZATION = 'Modeler is already initialized. Please use Modeler.getInstance() method to retrieve the modeler instance.',
  INSTANCE_RETRIEVAL = 'Modeler is not initialized. Please use Modeler.initialize() method to create a new instance of the modeler.',
  INVALID_MODELER_OPTIONS = 'Please provide valid modeler options.',
  SStF_INSTANCE_RETRIEVAL = 'SendStateFactory is not initialized. Please use SendStateFactory.initialize() method to create a new instance of the factory.',
  SStF_INITIALIZATION = 'SendStateFactory is already initialized. Please use SendStateFactory.getInstance() method to retrieve the factory instance.',
  SSTF_INSTANCE_RETRIEVAL = 'SendStateTransitionFactory is not initialized. Please use SendStateTransitionFactory.initialize() method to create a new instance of the factory.',
  SSTF_INITIALIZATION = 'SendStateTransitionFactory is already initialized. Please use SendStateTransitionFactory.getInstance() method to retrieve the factory instance.'
}

export enum ShapeNamespace {
  COMMON = 'sbpm.common',
  SID = 'sbpm.sid',
  SBD = 'sbpm.sbd'
}

export enum ShapeType {
  ORIGIN = 'sbpm.common.Origin',
  MESSAGE = 'sbpm.sid.Message',
  STANDARD_SUBJECT = 'sbpm.sid.StandardSubject',
  SEND_STATE = 'sbpm.sbd.SendState',
  RECEIVE_STATE = 'sbpm.sbd.ReceiveState',
  FUNCTION_STATE = 'sbpm.sbd.FunctionState',
  SEND_STATE_TRANSITION = 'sbpm.sbd.SendStateTransition',
  RECEIVE_STATE_TRANSITION = 'sbpm.sbd.ReceiveStateTransition',
  FUNCTION_STATE_TRANSITION = 'sbpm.sbd.FunctionStateTransition'
}

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

export enum CustomEvent {
  ELEMENT_ADD_MESSAGE = 'element:addMessage',
  ELEMENT_ADD_SEND_STATE_TRANSITION = 'element:addSendTransition',
  ELEMENT_ADD_RECEIVE_STATE_TRANSITION = 'element:addReceiveTransition',
  ELEMENT_ADD_FUNCTION_STATE_TRANSITION = 'element:addFunctionTransition',
  LINK_REMOVE = 'link:remove',
  LINK_REMOVE_VERTICES = 'link:removeVertices'
}

export const SVG_PREFIX = 'data:image/svg+xml;utf8,';
