import * as joint from 'jointjs';

// type SbpmElementSelectors<Options, JointOptions, ToolsOptions> = joint.shapes.standard.ImageSelectors & {
//   options: Options;
//   jointOptions: JointOptions;
//   toolsOptions: ToolsOptions;
// };

// type SbpmElementAttributes<Options, JointOptions, ToolsOptions> = joint.dia.Element.GenericAttributes<
//   SbpmElementSelectors<Options, JointOptions, ToolsOptions>
// >;

export default class SbpmElement extends joint.shapes.standard.Image {
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
