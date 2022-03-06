import * as joint from 'jointjs';
import { createLinkTools } from '../link-tools';
import SbpmLink from '../link';

export default class SbpmLinkView extends joint.dia.LinkView {
  // Workaround to have all custom properties and methods on the model
  get link() {
    return this.model as SbpmLink;
  }

  select() {
    if (this.link.hasTarget()) {
      this.link.select();
      this.addTools(createLinkTools(this.link.toolsOptions));
    }
  }
}
