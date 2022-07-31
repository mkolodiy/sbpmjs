import * as joint from 'jointjs';
import { CustomEvent, SbpmElementType } from '../common';
import type { GetUpdateOptions, SbpmShapeAttributes, SbpmShapeOptions } from '../common';
import type { SbpmElementToolsOptions } from './element-tools';

const attrs = {
  image: {
    refWidth: '100%',
    refHeight: '100%',
  },
  label: {
    textVerticalAnchor: 'top',
    textAnchor: 'middle',
    refX: '50%',
    refY: '100%',
    refY2: 10,
    fontSize: 14,
    fill: '#333333',
  },
};

const markup = [
  {
    tagName: 'image',
    selector: 'image',
  },
  {
    tagName: 'text',
    selector: 'label',
  },
];

export type SbpmElementAttributes = joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> & SbpmShapeAttributes<SbpmElementToolsOptions>;

export type SbpmElementOptions = SbpmShapeOptions & {
  /**
   * The label that will be shown under the icon of the element.
   */
  label: string;
  /**
   * The position on the canvas where the element should be added at.
   */
  position: joint.dia.Point;
};

export class SbpmElement extends joint.dia.Element<SbpmElementAttributes> {
  type: SbpmElementType = undefined as unknown as SbpmElementType;

  defaults() {
    return {
      ...super.defaults,
      attrs,
    };
  }

  markup = markup;

  public get toolsOptions() {
    return this.attributes.toolsOptions as SbpmElementToolsOptions;
  }

  public update(options: GetUpdateOptions<SbpmElementOptions>) {
    const { label, position } = options;

    if (label) {
      this.attr('label/textWrap/text', label);
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
