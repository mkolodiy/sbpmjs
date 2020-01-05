/**
 * Representation of the options for the modeler initialization.
 */
export interface ModelerOptions {
  /**
   * Defines a HTML element for rendering the modeler.
   */
  el: Element;
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

export interface SubjectOptions {
  machine?: boolean;
  description: string;
  position: Coordinates;
}

export interface StateOptions {
  startState?: boolean;
  endState?: boolean;
  description: string;
  position: Coordinates;
}
