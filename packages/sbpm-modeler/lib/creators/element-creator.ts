import { SubjectOptions, StateOptions } from '../common/types';
import { createStandardSubjectOptions } from '../shapes/standard-subject';
import ElementFactory from '../factories/element-factory';
import Canvas from '../canvas';
import { createSendStateOptions } from '../shapes/send-state';
import { createReceiveStateOptions } from '../shapes/receive-state';
import { createFunctionStateOptions } from '../shapes/function-state';

export default class ElementCreator {
  private canvas: Canvas;
  private elementFactory: ElementFactory;

  /**
   * Constructor
   */
  public constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.elementFactory = new ElementFactory();
  }

  /**
   *
   */
  public addStandardSubject(options: SubjectOptions) {
    const creationOptions = createStandardSubjectOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addSendState(options: StateOptions) {
    const creationOptions = createSendStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addReceiveState(options: StateOptions) {
    const creationOptions = createReceiveStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }

  public addFunctionState(options: StateOptions) {
    const creationOptions = createFunctionStateOptions(options);
    return this.elementFactory.add(creationOptions);
  }
}
