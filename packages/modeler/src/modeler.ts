import * as joint from 'jointjs';

import { elementOptions, tools } from './example-1/element';
import { getProcessNetworkOptions } from './shapes/process-network/element';

const ShapeNamespace = {
  COMMON: 'sbpm.common',
  PND: 'sbpm.pnd',
  SID: 'sbpm.sid',
  SBD: 'sbpm.sbd',
} as const;

type SbpmElementSelectors<Options, JointOptions, ToolsOptions> = joint.shapes.standard.ImageSelectors & {
  options: Options;
  jointOptions: JointOptions;
  toolsOptions: ToolsOptions;
};

export type SbpmElementAttributes<Options, JointOptions, ToolsOptions> = joint.dia.Element.GenericAttributes<
  SbpmElementSelectors<Options, JointOptions, ToolsOptions>
>;

class SbpmElement<Options, JointOptions, ToolsOptions> extends joint.dia.Element<SbpmElementAttributes<Options, JointOptions, ToolsOptions>> {
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

  public get options() {
    return this.attributes.options;
  }

  get toolsOptions() {
    return this.attributes.toolsOptions;
  }
}

class SbpmProcessNetwork extends SbpmElement<any, any, any> {}

class SbpmElementView extends joint.dia.ElementView {
  select() {
    this.addTools(tools());
  }
}

type ModelerOptions = {
  container: HTMLElement;
};

class Modeler {
  private _canvas: Canvas;
  constructor(options: ModelerOptions) {
    this._canvas = new Canvas(options);
  }

  addSbpmProcessNetwork(options: any, representationalOptions?: any) {
    const sbpmProcessNetworkOptions = getProcessNetworkOptions(options, representationalOptions);
    console.log(sbpmProcessNetworkOptions);

    //@ts-ignore
    const sbpmProcessNetwork = new SbpmProcessNetwork(sbpmProcessNetworkOptions);
    console.log(sbpmProcessNetwork);
    const image = new joint.shapes.standard.Image(elementOptions);
    console.log(image);
    sbpmProcessNetwork.addTo(this._canvas.graph);
    // image.addTo(this._canvas.graph);
  }
}

const paperOptions: joint.dia.Paper.Options = {
  width: '100%',
  height: '100%',
  gridSize: 1,
  linkPinning: false,
  origin: {
    x: 0,
    y: 0,
  },
  elementView: SbpmElementView,
};

const JointEvent = {
  BLANK_POINTERDOWN: 'blank:pointerdown',
  ELEMENT_POINTERDOWN: 'element:pointerdown',
} as const;

type EventMap = joint.dia.Paper.EventMap & {
  'element:pointerdown': (elementView: SbpmElementView, evt: joint.dia.Event, x: number, y: number) => void;
};

class Canvas {
  private _graph: joint.dia.Graph;
  private _paper: joint.dia.Paper;

  constructor(options: ModelerOptions) {
    const { container } = options;

    this._graph = new joint.dia.Graph();
    this._paper = new joint.dia.Paper({
      ...paperOptions,
      el: container,
      model: this._graph,
      defaultRouter: { name: 'normal' },
    });

    this.registerPaperEvents();
    this.registerShapeEvents();
  }

  get graph() {
    return this._graph;
  }

  private registerShapeEvents() {
    this._paper.on<keyof EventMap>(JointEvent.ELEMENT_POINTERDOWN, (sbpmElementView: SbpmElementView) => {
      sbpmElementView.select();
    });
  }

  private registerPaperEvents() {
    this._paper.on(JointEvent.BLANK_POINTERDOWN, () => {
      this._paper.hideTools();
    });
  }
}

export default Modeler;
