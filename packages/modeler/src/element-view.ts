import * as joint from 'jointjs';
import { createElementTools } from './element-tools';

export default class SbpmElementView extends joint.dia.ElementView {
  select() {
    //@ts-ignore
    console.log('TODO: select', this.model.toolsOptions);
    //@ts-ignore
    this.addTools(createElementTools(this.model.toolsOptions));
  }
}
