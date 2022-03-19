import * as joint from 'jointjs';
import type { GenericOptions } from '../common';
import { attrs, markup } from './options';
import type { SbpmElementAttributes, SbpmElementOptions } from './types';

export default class SbpmElement<T = GenericOptions> extends joint.dia.Element<SbpmElementAttributes<T>> {
  defaults() {
    return {
      ...super.defaults,
      attrs,
    };
  }

  markup = markup;

  public get initialOptions() {
    return this.attributes.initialOptions!;
  }

  public get jointOptions() {
    return this.attributes.jointOptions!;
  }

  public get toolsOptions() {
    return this.attributes.toolsOptions!;
  }

  public update(options: SbpmElementOptions) {
    const { label, position } = options;

    this.attr('label/text', label);
    this.prop('position', position);
  }

  public select() {
    this.attr('image/cursor', 'move');
    this.toFront();
  }

  public deselect() {
    this.attr('image/cursor', 'pointer');
  }
}
