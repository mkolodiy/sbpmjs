import Canvas from '../canvas';
import ElementFactory from '../factories/element-factory';
import { SubjectOptions, StateOptions } from '../common/types';
import { createStandardSubjectOptions } from '../shapes/elements/standard-subject';
import { createSendStateOptions } from '../shapes/elements/send-state';
import { createReceiveStateOptions } from '../shapes/elements/receive-state';
import { createFunctionStateOptions } from '../shapes/elements/function-state';

export default class ElementCreator {
  private elementFactory: ElementFactory;

  /**
   * Constructor
   *
   * @param canvas [[Canvas]] object
   */
  public constructor(canvas: Canvas) {
    this.elementFactory = new ElementFactory(canvas);
  }

  /**
   * Adds a new standard subject to the canvas.
   *
   * @param options [[SubjectOptions]] object
   */
  public addStandardSubject(options: SubjectOptions) {
    const creationOptions = createStandardSubjectOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  /**
   * Adds a new send state to the canvas.
   *
   * @param options [[StateOptions]] object
   */
  public addSendState(options: StateOptions) {
    const creationOptions = createSendStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  /**
   * Adds a new receive state to the canvas.
   *
   * @param options [[StateOptions]] object
   */
  public addReceiveState(options: StateOptions) {
    const creationOptions = createReceiveStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  /**
   * Adds a new function state to the canvas.
   *
   * @param options [[StateOptions]] object
   */
  public addFunctionState(options: StateOptions) {
    const creationOptions = createFunctionStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }
}
