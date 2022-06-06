import * as joint from 'jointjs';
import { createLinkTools } from './link-tools';
import SbpmLink from './link';

export class SbpmLinkView extends joint.dia.LinkView {
  // Workaround to have all custom properties and methods on the model
  public get link() {
    return this.model as SbpmLink;
  }

  public select() {
    if (this.link.hasTarget()) {
      this.link.select();
      this.addTools(createLinkTools(this.link.toolsOptions));
    }
  }
}
