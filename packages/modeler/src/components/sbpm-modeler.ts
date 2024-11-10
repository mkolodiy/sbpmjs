import { html, render } from "lit-html";

export class SbpmModeler extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });

		const div = document.createElement("div");
		this.#shadowRoot.appendChild(div);
	}

	connectedCallback() {
		this.#render();
	}

	onDrag(event: DragEvent) {
		if (event.target instanceof HTMLDivElement) {
			event.dataTransfer?.setData("element", event.target.id);
		}
	}

	#render() {
		const container = this.#shadowRoot.querySelector("div");

		if (!container) {
			throw new Error("sbpm-modeler: Could not get container.");
		}

		const template = html`<div><div id="sbpm-process-model" draggable="true" @dragstart="${this.onDrag}">Model</div></div>`;
		render(template, container);
	}
}

customElements.define("sbpm-modeler", SbpmModeler);
