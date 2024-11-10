import { html, render } from "lit-html";
import { getState } from "../state";

export class SbpmCanvas extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });

		this.#render();
	}

	connectedCallback() {
		this.#render();
	}

	onDrop(event: DragEvent) {
		event.preventDefault();

		const type = event.dataTransfer?.getData("element");

		const id = crypto.randomUUID();
		getState().setItem(id, {
			type: "sbpm.pnd.SbpmProcessModel",
			id,
			label: "New process model",
			position: {
				x: event.clientX,
				y: event.clientY,
			},
		});
	}

	onAllowDrop(event) {
		event.preventDefault();
	}

	#render() {
		const template = html`<div id="sbpm-canvas" @drop="${this.onDrop}" @dragover="${this.onAllowDrop}"></div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-canvas", SbpmCanvas);
