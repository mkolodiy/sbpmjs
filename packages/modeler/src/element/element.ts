import * as joint from 'jointjs';
import type { GenericOptions, SbpmElementAttributes } from '../common';
import { attrs, markup } from './options';

export default class SbpmElement<T = GenericOptions> extends joint.dia.Element<SbpmElementAttributes<T>> {
  defaults() {
    return {
      ...super.defaults,
      attrs,
    };
  }

  markup = markup;

  get initialOptions() {
    return this.attributes.initialOptions;
  }

  get jointOptions() {
    return this.attributes.jointOptions;
  }

  get toolsOptions() {
    return this.attributes.toolsOptions;
  }

  update(options: any, representationalOptions?: any) {
    const { label } = options;
    const { position } = representationalOptions;

    this.attr('label/text', label);
    this.prop('position', position);
  }
}
