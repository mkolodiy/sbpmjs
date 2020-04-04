import { ShapeType } from './constants';

/* COMMON TYPES */

/**
 * Representation of the generic options.
 */
export interface GenericOptions {
  [key: string]: any;
}

/**
 * Representation of the coordinates.
 */
export interface Coordinates {
  /**
   * Defines x position.
   */
  x: number;
  /**
   * Defines y position.
   */
  y: number;
}

/**
 * Representation of the button options.
 */
export interface ButtonOptions {
  /**
   * Defines coordinates where the button should be positioned.
   */
  coordinates: Coordinates;
  /**
   * Defines which event should be triggered when the button is clicked.
   */
  event?: string;
}

/**
 * Representation of the general options used to create a new shape.
 */
export interface CreationOptions<A> {
  /**
   * Defines joint options.
   */
  jointOptions: GenericOptions;
  /**
   * Defines shape options that are provided by the users of the library.
   */
  options: A;
  /**
   * Defines shape type.
   */
  type: ShapeType;
}

/* GENERAL TYPES */

/**
 * Representation of the options for the modeler initialization.
 */
export interface ModelerOptions {
  /**
   * Defines a HTML element for rendering the modeler.
   */
  container: Element;
  /**
   * Defines a router name. Possible values are: manhattan, metro, normal, orthogonal and oneSide.
   */
  routerName?: string;
}

/* ELEMENT TYPES*/

/**
 * Representation of the options used to create a new element shape.
 */
export interface ElementCreationOptions<A> extends CreationOptions<A> {
  /**
   * Defines icon of the element.
   */
  icon?: string;
  /**
   * Defines element tools options.
   */
  toolsOptions: ElementToolsOptions;
}

/**
 * Representation of the options for the creation of element tools for a subject.
 */
export interface ElementToolsOptions {
  /**
   * Defines the position of the remove button.
   */
  removeButtonOptions?: ButtonOptions;
  /**
   * Defines the position of the openInNew button.
   */
  openInNewButtonOptions?: ButtonOptions;
  /**
   * Defines the position of the link button.
   */
  linkButtonOptions?: ButtonOptions;
}

/**
 * Representation of the options used to create a element shape.
 */
export interface ElementOptions {
  /**
   * Defines description that will be shown besides the icon of the element.
   */
  description: string;
  /**
   * Defines position on the canvas where the element should be added at.
   */
  position: Coordinates;
}

/**
 * Representation of the subject options.
 */
export interface SubjectOptions extends ElementOptions {
  /**
   * Defines which icon (human or machine) should be used for a subject.
   *
   * @default false
   */
  isMachine?: boolean;
}

/**
 * Representation of the subject update options.
 */
export type SubjectUpdateOptions = Partial<Omit<SubjectOptions, 'position'>>;

/**
 * Representation of the state options.
 */
export interface StateOptions extends ElementOptions {
  /**
   * Defines if a state is a start state.
   *
   * @default false
   */
  startState?: boolean;
  /**
   * Defines if a state is an end state.
   *
   * @default false
   */
  endState?: boolean;
}

/**
 * Representation of the state update options.
 */
export type StateUpdateOptions = Partial<Omit<StateOptions, 'position'>>;

/* LINK TYPES*/

/**
 * Representation of the options used to create a new link shape.
 */
export interface LinkCreationOptions<A> extends CreationOptions<A> {
  /**
   * Defines a label that should be used as an icon for a link shape.
   */
  iconLabel: {};
  /**
   * Defines label based link tools options.
   */
  labelBasedLinkToolsOptions: LabelBasedLinkToolsOptions;
}

/**
 * Representation of tha label based link tools options.
 */
export interface LabelBasedLinkToolsOptions {
  /**
   * Defines options used to create selection label.
   */
  selectionLabelOptions: GenericOptions;
  /**
   * Defines options used to create remove label.
   */
  removeLabelOptions: GenericOptions;
  /**
   * Defines options used to create remove vertices label.
   */
  removeVerticesLabelOptions: GenericOptions;
}

/**
 * Representation of the options used to create a link shape.
 */
export interface LinkOptions {
  /**
   * Defines a source element.
   */
  source: joint.dia.Cell | Coordinates;
  /**
   * Defines a target element.
   */
  target: joint.dia.Cell | Coordinates;
}

/**
 * Representation of the message transition options.
 */
export interface MessageTransitionOptions extends LinkOptions {
  /**
   * Defines is a message transition goes in both directions.
   */
  isBidirectional?: boolean;
}

/**
 * Representation of the message transition update options.
 */
export type MessageTransitionUpdateOptions = Partial<
  Omit<MessageTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of the send state transition options.
 */
export interface SendStateTransitionOptions extends LinkOptions {
  /**
   * Defines a subject that receives a message.
   */
  receiver: string;
  /**
   * Defines a message that is sent to a subject.
   */
  message: string;
}

/**
 * Representation of the send state transition update options.
 */
export type SendStateTransitionUpdateOptions = Partial<
  Omit<SendStateTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of the receive state transition options.
 */
export interface ReceiveStateTransitionOptions extends LinkOptions {
  /**
   * Defines a subject that sends a message.
   */
  sender: string;
  /**
   * Defines a message that is received by a subject.
   */
  message: string;
}

/**
 * Representation of the receive state transition update options.
 */
export type ReceiveStateTransitionUpdateOptions = Partial<
  Omit<ReceiveStateTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of the function state transition options.
 */
export interface FunctionStateTransitionOptions extends LinkOptions {
  /**
   * Defines a action that is executed by a subject.
   */
  action: string;
}

/**
 * Representation of the function state transition update options;
 */
export type FunctionStateTransitionUpdateOptions = Partial<
  Omit<FunctionStateTransitionOptions, 'source' | 'target'>
>;
