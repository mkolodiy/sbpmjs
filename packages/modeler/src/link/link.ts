import * as joint from 'jointjs';
import type { GenericOptions, SbpmLinkAttributes } from '../common';
import { attrs, markup } from './options';

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

  update(options: any, representationalOptions?: any) {
    // TODO
  }

  select() {
    // this.attr('image/cursor', 'move');
    this.toFront();
  }

  deselect() {
    // this.attr('image/cursor', 'pointer');
  }
}
