import { ShapeType } from './constants';

/* COMMON TYPES */

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

export interface ButtonOptions {
  coordinates: Coordinates;
  event?: string;
}

/* GENERAL TYPES */

/**
 * Representation of the options for the modeler initialization.
 */
export interface ModelerOptions {
  /**
   * Defines a HTML element for rendering the modeler.
   */
  el: Element;
  /**
   * Defines a router name. Possible values are: manhattan, metro, normal, orthogonal and oneSide.
   */
  routerName?: string;
}

/* ELEMENT TYPES*/

export interface ElementOptions extends GenericOptions {
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

export interface ElementCreationOptions<A> {
  jointOptions: {};
  options: A;
  toolsOptions: ElementToolsOptions;
  icon: string;
  type: ShapeType;
}

/**
 * Representation of the options for the creation of a subject.
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
 * Representation of the options for the creation of a state.
 */
export interface StateOptions extends ElementOptions {
  startState?: boolean;
  endState?: boolean;
}

/* LINK TYPES*/

export interface LabelBasedLinkToolsOptions {
  selectionLabelOptions: GenericOptions;
  removeLabelOptions: GenericOptions;
  removeVerticesLabelOptions: GenericOptions;
}

/**
 * Representation of the options for the creation of a message.
 */
export interface MessageOptions {
  /**
   * Defines a source of a message.
   */
  source: joint.dia.Cell | Coordinates;
  /**
   * Defines a target of a message.
   */
  target: joint.dia.Cell | Coordinates;
}

export interface LinkOptions {
  source: joint.dia.Cell | Coordinates;
  target: joint.dia.Cell | Coordinates;
}
