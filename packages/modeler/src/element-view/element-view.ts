import * as joint from 'jointjs';
import { createElementTools } from '../element-tools';
import SbpmElement from '../element';

export default class SbpmElementView extends joint.dia.ElementView {
  // Workaround to have all custom properties and methods on the model
  get element() {
    return this.model as SbpmElement;
  }

  select() {
    this.element.select();
    this.addTools(createElementTools(this.element.toolsOptions));
  }
}
