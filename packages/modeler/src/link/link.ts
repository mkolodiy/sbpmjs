import * as joint from 'jointjs';
import type { GenericOptions } from '../common';
import { attrs, markup } from './options';
import type { SbpmLinkAttributes, SbpmLinkOptions } from './types';

export default class SbpmLink<T = GenericOptions> extends joint.dia.Link<SbpmLinkAttributes<T>> {
  defaults() {
    return {
      ...super.defaults,
      attrs,
    };
  }

  markup = markup;

  get initialOptions() {
    return this.attributes.initialOptions!;
  }

  get jointOptions() {
    return this.attributes.jointOptions!;
  }

  get toolsOptions() {
    return this.attributes.toolsOptions!;
  }

  hasSource() {
    return Reflect.has(this.source(), 'id');
  }

  hasTarget() {
    return Reflect.has(this.target(), 'id');
  }

  update(options: SbpmLinkOptions) {
    const { source, target } = options;

    if (source) {
      this.source(source);
    }

    if (target) {
      this.target(target);
    }
  }

  select() {
    this.toFront();
  }

  deselect() {
    // Deliberately left empty
  }

  resetVertices() {
    this.vertices([]);
  }
}
