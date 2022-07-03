import * as joint from 'jointjs';
import type { GetUpdateOptions, SbpmShapeAttributes, SbpmShapeOptions } from '../common';
import { SbpmElement } from './element';
import type { SbpmLinkLabelToolsOptions, SbpmLinkToolsOptions } from './link-tools';

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

export type SbpmLinkOptions<Source = SbpmElement, Target = SbpmElement> = SbpmShapeOptions & {
  /**
   * The source element.
   */
  source: Source;
  /**
   * The target element.
   */
  target: Target;
};

export class SbpmLink extends joint.dia.Link<SbpmLinkAttributes> {
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

  public get labelToolsOptions() {
    return this.attributes.labelToolsOptions as SbpmLinkLabelToolsOptions;
  }

  public hasSource() {
    return Reflect.has(this.source(), 'id');
  }

  public hasTarget() {
    return Reflect.has(this.target(), 'id');
  }

  public update(options: GetUpdateOptions<SbpmLinkOptions>) {
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
