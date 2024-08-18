import { SbpmCanvas, type SbpmCanvasOptions } from "./canvas";
import {
	SbpmMessageTransition,
	type SbpmMessageTransitionOptions,
} from "./sbpm/message-transition";
import { SbpmSubject, type SbpmSubjectOptions } from "./sbpm/subject";

export type SbpmModelerOptions = SbpmCanvasOptions;

export class SbpmModeler {
	#canvas: SbpmCanvas;

	constructor(options: SbpmModelerOptions) {
		this.#canvas = new SbpmCanvas(options);
	}

	public get canvas() {
		return this.#canvas;
	}

	public createSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return new SbpmSubject(options);
	}

	public addSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return this.createSbpmSubject(options).addTo(this.#canvas.graph);
	}

	public createSbpmMessageTransition(
		options: SbpmMessageTransitionOptions,
	): SbpmMessageTransition {
		return new SbpmMessageTransition(options);
	}

	public addSbpmMessageTransition(
		options: SbpmMessageTransitionOptions,
	): SbpmMessageTransition {
		return this.createSbpmMessageTransition(options).addTo(this.#canvas.graph);
	}
}
