import Canvas from '../canvas';
import ElementFactory from '../factories/element-factory';
import { SubjectOptions, StateOptions, GenericOptions } from '../common/types';
import {
  createStandardSubjectOptions,
  createSendStateOptions,
  createReceiveStateOptions,
  createFunctionStateOptions
} from '../shapes/elements';
import { updateOptionsMapping } from '../shapes/mappings';

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

  /**
   * Updates currently selected element on canvas.
   *
   * @param options Update options.
   */
  public updateCurrentlySelectedElement(options: GenericOptions) {
    const type = this.elementFactory.getSelectedElementType();
    console.log(updateOptionsMapping[type](options));
    this.elementFactory.update(updateOptionsMapping[type](options));
  }
}
