import * as joint from 'jointjs';
import { createElementTools } from '../element-tools/element-tools';

export default class SbpmElementView extends joint.dia.ElementView {
  select() {
    this.model.toFront();
    //@ts-ignore
    this.addTools(createElementTools(this.model.toolsOptions));
  }
}
