import { SubjectOptions, StateOptions } from '../common/types';
import { createStandardSubjectOptions } from '../shapes/elements/standard-subject';
import ElementFactory from '../factories/element-factory';
import { createSendStateOptions } from '../shapes/elements/send-state';
import { createReceiveStateOptions } from '../shapes/elements/receive-state';
import { createFunctionStateOptions } from '../shapes/elements/function-state';

export default class ElementCreator {
  private elementFactory: ElementFactory;

  /**
   * Constructor
   */
  public constructor() {
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
