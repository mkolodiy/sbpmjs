import * as joint from 'jointjs';
import { CustomEvent } from '../canvas';
import type { GenericOptions, GetUpdateOptions } from '../common';
import type { SbpmElementToolsOptions } from '../element-tools';
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
    return this.attributes.initialOptions as T;
  }

  public get jointOptions() {
    return this.attributes.jointOptions as joint.shapes.standard.ImageAttributes;
  }

  public get toolsOptions() {
    return this.attributes.toolsOptions as SbpmElementToolsOptions;
  }

  public update(options: GetUpdateOptions<SbpmElementOptions>) {
    const { label, position } = options;

    if (label) {
      this.attr('label/text', label);
    }

    if (position) {
      this.prop('position', position);
    }

    this.trigger(CustomEvent.ELEMENT_UPDATED, this);
  }

  public select() {
    this.attr('image/cursor', 'move');
    this.toFront();
  }

  public deselect() {
    this.attr('image/cursor', 'pointer');
  }
}
