import * as joint from 'jointjs';
import type { GetUpdateOptions, SbpmLinkTypeKey, SbpmShapeAttributes, SbpmShapeOptions } from '../common';
import { SbpmElement } from './element';
import type { SbpmLinkToolsOptions } from './link-tools';

export const attrs = {
  line: {
    connection: true,
    stroke: '#333333',
    strokeWidth: 2,
    strokeLinejoin: 'round',
    targetMarker: {
      type: 'path',
      d: 'M 10 -5 0 0 10 5 z',
    },
  },
  wrapper: {
    connection: true,
    strokeWidth: 10,
    strokeLinejoin: 'round',
  },
};

export const markup = [
  {
    tagName: 'path',
    selector: 'wrapper',
    attributes: {
      fill: 'none',
      cursor: 'pointer',
      stroke: 'transparent',
      'stroke-linecap': 'round',
    },
  },
  {
    tagName: 'path',
    selector: 'line',
    attributes: {
      fill: 'none',
      'pointer-events': 'none',
    },
  },
];

export type SbpmLinkAttributes = joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> & SbpmShapeAttributes<SbpmLinkToolsOptions>;

export type SbpmLinkOptions<Type extends SbpmLinkTypeKey = SbpmLinkTypeKey, Source = SbpmElement, Target = SbpmElement> = SbpmShapeOptions<Type> & {
  source?: Source;
  target?: Target;
};

export class SbpmLink<T extends SbpmLinkTypeKey = SbpmLinkTypeKey> extends joint.dia.Link<SbpmLinkAttributes> {
  defaults() {
    return {
      ...super.defaults,
      attrs,
    };
  }

  markup = markup;

  public get toolsOptions() {
    return this.attributes.toolsOptions as SbpmLinkToolsOptions;
  }

  public hasSource() {
    return Reflect.has(this.source(), 'id');
  }

  public hasTarget() {
    return Reflect.has(this.target(), 'id');
  }

  public update(options: GetUpdateOptions<SbpmLinkOptions<T>>) {
    const { source, target } = options;

    if (source) {
      this.source(source);
    }

    if (target) {
      this.target(target);
    }
  }

  public select() {
    this.toFront();
  }

  public deselect() {
    // Deliberately left empty
  }

  public resetVertices() {
    this.vertices([]);
  }
}
