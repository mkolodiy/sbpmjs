/**
 * Representation of the options for the modeler initialization.
 */
export interface ModelerOptions {
  /**
   * Defines a HTML element for rendering the modeler.
   */
  el: Element;
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

export interface ElementToolsOptions {
  removeButtonOptions?: Coordinates;
  openInNewButtonOptions?: Coordinates;
  linkButtonOptions?: Coordinates;
}

export interface MessageOptions {
  source: joint.dia.Cell | Coordinates;
  target: joint.dia.Cell | Coordinates;
}
