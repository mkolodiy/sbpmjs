import { SbpmCanvas, type SbpmCanvasOptions } from "./canvas";
import type { SbpmElement } from "./core/element";
import { SbpmSubject, type SbpmSubjectOptions } from "./sbpm/subject";
import type { SbpmLink } from "./core/link";

export type SbpmModelerOptions = SbpmCanvasOptions;

export class SbpmModeler {
	#canvas: SbpmCanvas;

	constructor(options: SbpmModelerOptions) {
		console.log("Test");

		this.#canvas = new SbpmCanvas(options);
	}

	public get canvas() {
		return this.#canvas;
	}

	public addElement(item: SbpmElement): void {
		this.#canvas.addElement(item);
	}

	public addLink(link: SbpmLink): void {
		this.#canvas.addLink(link);
	}

	public createSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return new SbpmSubject(options);
	}

	public addSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return this.createSbpmSubject(options).addTo(this.#canvas.graph);
	}
}
