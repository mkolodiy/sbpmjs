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

export interface IElementOptions extends IGenericOptions {
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
 * Representation of the options for the creation of a subject.
 */
export interface SubjectOptions extends IElementOptions {
  /**
   * Defines if a subject is of type machine or human. Is need to display different icons.
   *
   * @default false
   */
  isMachine?: boolean;
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

export interface ButtonOptions {
  coordinates: Coordinates;
  event?: string;
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

/**
 * Representation of the options for the creation of a state.
 */
export interface StateOptions {
  startState?: boolean;
  endState?: boolean;
  description: string;
  position: Coordinates;
}

export interface SendStateTransitionOptions {
  source: joint.dia.Cell | Coordinates;
  target: joint.dia.Cell | Coordinates;
}

export interface ISingleton {
  instance: unknown;
  initialize: () => unknown;
  getInstance: () => unknown;
}

export interface ILinkOptions {
  source: joint.dia.Cell | Coordinates;
  target: joint.dia.Cell | Coordinates;
}

export interface IGenericOptions {
  [key: string]: any;
}

export interface ILabelBasedLinkToolsOptions {
  selectionLabelOptions: IGenericOptions;
  removeLabelOptions: IGenericOptions;
  removeVerticesLabelOptions: IGenericOptions;
}
