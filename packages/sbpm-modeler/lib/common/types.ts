import { ShapeType } from './constants';

/* COMMON TYPES */

/**
 * Representation of generic options.
 */
export interface GenericOptions {
  [key: string]: any;
}

/**
 * Representation of coordinates.
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
 * Representation of button options.
 */
export interface ButtonOptions {
  /**
   * Defines button position.
   */
  coordinates: Coordinates;
  /**
   * Defines button event.
   */
  event?: string;
}

/**
 * Representation of general options used to create a new shape.
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
 * Representation of modeler options.
 */
export interface ModelerOptions {
  /**
   * Defines a HTML element for rendering the modeler.
   */
  container: Element;
  /**
   * Defines a router name. Possible values are: manhattan, metro, normal, orthogonal and oneSide.
   *
   * @default normal
   */
  routerName?: string;
}

/* ELEMENT TYPES*/

/**
 * Representation of element creation options.
 */
export interface ElementCreationOptions<A> extends CreationOptions<A> {
  /**
   * Defines element tools options.
   */
  toolsOptions: ElementToolsOptions;
}

/**
 * Representation of element tools options.
 */
export interface ElementToolsOptions {
  /**
   * Defines remove button options.
   */
  removeButtonOptions?: ButtonOptions;
  /**
   * Defines openInNew button options.
   */
  openInNewButtonOptions?: ButtonOptions;
  /**
   * Defines link button options.
   */
  linkButtonOptions?: ButtonOptions;
}

/**
 * Representation element options.
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
 * Representation of subject options.
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
 * Representation of state options.
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
 * Representation of state update options.
 */
export type StateUpdateOptions = Partial<Omit<StateOptions, 'position'>>;

/* LINK TYPES*/

/**
 * Representation of link creation options.
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
 * Representation of label based link tools options.
 */
export interface LabelBasedLinkToolsOptions {
  /**
   * Defines selection label options.
   */
  selectionLabelOptions: GenericOptions;
  /**
   * Defines  remove label options.
   */
  removeLabelOptions: GenericOptions;
  /**
   * Defines vertices label options.
   */
  removeVerticesLabelOptions: GenericOptions;
}

/**
 * Representation of link options.
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
 * Representation of message transition options.
 */
export interface MessageTransitionOptions extends LinkOptions {
  /**
   * Defines is a message transition goes in both directions.
   */
  isBidirectional?: boolean;
}

/**
 * Representation of message transition update options.
 */
export type MessageTransitionUpdateOptions = Partial<
  Omit<MessageTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of send state transition options.
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
 * Representation of send state transition update options.
 */
export type SendStateTransitionUpdateOptions = Partial<
  Omit<SendStateTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of receive state transition options.
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
 * Representation of receive state transition update options.
 */
export type ReceiveStateTransitionUpdateOptions = Partial<
  Omit<ReceiveStateTransitionOptions, 'source' | 'target'>
>;

/**
 * Representation of function state transition options.
 */
export interface FunctionStateTransitionOptions extends LinkOptions {
  /**
   * Defines a action that is executed by a subject.
   */
  action: string;
}

/**
 * Representation of function state transition update options;
 */
export type FunctionStateTransitionUpdateOptions = Partial<
  Omit<FunctionStateTransitionOptions, 'source' | 'target'>
>;
