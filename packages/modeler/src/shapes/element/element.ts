import * as joint from 'jointjs';
import type { GenericOptions, SbpmElementAttributes } from '../../common/types';

export default class SbpmElement<T = GenericOptions> extends joint.dia.Element<SbpmElementAttributes<T>> {
  defaults() {
    return {
      ...super.defaults,
      attrs: {
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
      },
    };
  }

  markup = [
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ];

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
