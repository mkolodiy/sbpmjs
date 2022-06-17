import * as joint from 'jointjs';
import { createElementTools } from './element-tools';
import type { SbpmElementToolsOptions } from './element-tools';
import { SbpmElement } from './element';
import type { SbpmModelerOptions } from '../canvas';

export class SbpmElementView extends joint.dia.ElementView {
  // Workaround to have all custom properties and methods on the model
  public get element() {
    return this.model as SbpmElement;
  }

  public select() {
    this.element.select();
    this.addTools(createElementTools(this.element.toolsOptions));
  }

  public refresh() {
    if (this.hasTools()) {
      this.hideTools();
      this.addTools(createElementTools(this.element.toolsOptions));
    }
  }
}

export function addActionsToElementToolsOptions(toolsOptions: SbpmElementToolsOptions, modelerOptions: SbpmModelerOptions): SbpmElementToolsOptions {
  const { onDeleteElement, onOpenElement } = modelerOptions;
  const toolsOptionsCopy = joint.util.cloneDeep(toolsOptions);

  for (const toolOption of toolsOptionsCopy) {
    if (toolOption.type === 'remove') {
      toolOption.options.action = (_evt: joint.dia.Event, elementView: joint.dia.ElementView, tool: joint.dia.ToolView) => {
        onDeleteElement?.((elementView as SbpmElementView).element);
        (elementView as SbpmElementView).element.remove({ ui: true, tool: tool.cid });
      };
    }

    if (toolOption.type === 'open') {
      toolOption.options.action = (_evt: joint.dia.Event, elementView: joint.dia.ElementView) => {
        onOpenElement?.((elementView as SbpmElementView).element);
      };
    }
  }

  return toolsOptionsCopy;
}
