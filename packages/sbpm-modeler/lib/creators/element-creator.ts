import { SubjectOptions } from '../types';
import { createStandardSubjectOptions } from '../shapes/standard-subject';
import ElementFactory from '../factories/element-factory copy';

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
}
