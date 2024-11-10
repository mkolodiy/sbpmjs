import { html, render } from "lit-html";
import {
	ElementSelectedEvent,
	listenForItemUpdatedEvent,
} from "../custom-events";
import { getState, type ItemKey } from "../state";

export class SbpmModeler extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });

		const div = document.createElement("div");
		this.#shadowRoot.appendChild(div);
	}

	connectedCallback() {
		window.addEventListener("element-selected", (event) => {
			if (event instanceof ElementSelectedEvent) {
				this.#render(event.detail.id);
			}
		});
		// window.addEventListener("element-label-changed", (event) => {
		// 	if (event instanceof ElementLabelChangedEvent) {
		// 		this.#render(event.detail.id);
		// 	}
		// });
		listenForItemUpdatedEvent((event) => {
			this.#render(event.detail.id);
		});
	}

	#render(id: ItemKey) {
		const container = this.#shadowRoot.querySelector("div");
		if (!container) {
			throw new Error("sbpm-item-selector: Could not get container element.");
		}

		const item = getState().getItem(id);
		console.log(item);

		if (!item) {
			throw new Error("sbpm-properties: Could not get item.");
		}
		const template = html`<p>${item.label}</p>`;
		render(template, container);
	}
}

customElements.define("sbpm-item-selector", SbpmModeler);
