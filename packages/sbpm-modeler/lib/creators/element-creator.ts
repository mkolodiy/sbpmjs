import Canvas from '../canvas';
import ElementFactory from '../factories/element-factory';
import {
  SubjectOptions,
  StateOptions,
  GenericOptions,
  ElementOptions,
  SubjectUpdateOptions
} from '../common/types';
import {
  createStandardSubjectOptions,
  createSendStateOptions,
  createReceiveStateOptions,
  createFunctionStateOptions,
  recreateStandardSubject
} from '../shapes/elements';
import {
  updateOptionsMapping,
  recreateElementMapping
} from '../shapes/mappings';
import { ShapeType } from '../common/constants';

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

  public updateCurrentlySelectedElement(options: GenericOptions) {
    const type = this.elementFactory.getSelectedElementType();

    if (
      type === ShapeType.STANDARD_SUBJECT &&
      recreateElementMapping[type](options)
    ) {
      return this.recreateStandardSubject(options);
    }

    this.elementFactory.updateSelectedElement(
      updateOptionsMapping[type](options)
    );
  }

  private recreateStandardSubject(updateOptions: SubjectUpdateOptions) {
    const selectedElementAttributes = this.elementFactory.getSelectedElementAttributes();

    const currentOptions = {
      description: selectedElementAttributes.description,
      position: selectedElementAttributes.position,
      isMachine: selectedElementAttributes.isMachine
    };

    const options = {
      ...currentOptions,
      ...updateOptions
    };

    this.elementFactory.removeSelectedElement();
    this.addStandardSubject(options);
  }
}
