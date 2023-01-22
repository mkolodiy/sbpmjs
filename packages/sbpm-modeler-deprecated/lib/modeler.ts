import 'jointjs/dist/joint.min.css';

import Canvas from './canvas';
import ElementCreator from './creators/element-creator';
import LinkCreator from './creators/link-creator';
import { ModelerOptions } from './common/types';

export default class Modeler {
  private canvasInstance: Canvas;
  private elementCreatorInstance: ElementCreator;
  private linkCreatorInstance: LinkCreator;

  /**
   * Constructor
   *
   * @param options [[ModelerOptions]] used to create a new modeler.
   */
  public constructor(options: ModelerOptions) {
    const { container } = options;
    this.canvasInstance = new Canvas(options);
    this.elementCreatorInstance = new ElementCreator(this.canvasInstance);
    this.linkCreatorInstance = new LinkCreator(this.canvasInstance, container);
  }

  /**
   * Returns canvas instance.
   *
   * @returns [[Canvas]] instance.
   */
  public get canvas() {
    return this.canvasInstance;
  }

  /**
   * Returns element creator instance.
   *
   * @returns [[ElementCreator]] instance.
   */
  public get elementCreator() {
    return this.elementCreatorInstance;
  }

  /**
   * Returns link creator instance.
   *
   * @returns [[LinkCreator]] instance.
   */
  public get linkCreator() {
    return this.linkCreatorInstance;
  }
}

export {
  ModelerOptions,
  SubjectOptions,
  SubjectUpdateOptions,
  StateOptions,
  StateUpdateOptions,
  MessageTransitionOptions,
  MessageTransitionUpdateOptions,
  SendStateTransitionOptions,
  SendStateTransitionUpdateOptions,
  ReceiveStateTransitionOptions,
  ReceiveStateTransitionUpdateOptions,
  FunctionStateTransitionOptions,
  FunctionStateTransitionUpdateOptions
} from './common/types';
