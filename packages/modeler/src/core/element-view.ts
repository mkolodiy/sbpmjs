import * as joint from 'jointjs';
import { createElementTools } from './element-tools';
import { SbpmElement } from './element';

export class SbpmElementView extends joint.dia.ElementView {
  // Workaround to have all custom properties and methods on the model
  public get element() {
    return this.model as SbpmElement;
  }

  public select() {
    this.element.select();
    this.addTools(createElementTools(this.element.toolsOptions));
  }

  public refresh() {
    if (this.hasTools()) {
      this.hideTools();
      this.addTools(createElementTools(this.element.toolsOptions));
    }
  }
}
