import { html, render } from "lit-html";
import { getState, type ItemKey } from "../state";
import { ElementSelectedEvent } from "../custom-events";

export class SbpmProperties extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		window.addEventListener("element-selected", (event) => {
			if (event instanceof ElementSelectedEvent) {
				console.log("selected", event.detail.id);

				this.#render(event.detail.id);
			}
		});
		window.addEventListener("element-deselected", () => {
			this.#hide();
		});
	}

	#hide() {
		render(undefined, this.#shadowRoot);
	}

	#render(id: ItemKey) {
		const item = getState().items.get(id);
		if (!item) {
			throw new Error("sbpm-properties: Could not get item.");
		}
		const template = html`<input id="label-input" value="${item.label}"/>`;
		render(template, this.#shadowRoot);
		const inputEl =
			this.#shadowRoot.querySelector<HTMLInputElement>("#label-input");

		inputEl?.addEventListener("input", (event) => {
			if (event instanceof InputEvent) {
				// dispatchItemUpdatedEvent({
				// 	id,
				// 	label: inputEl.value,
				// });
				getState().updateItem(id, { label: inputEl.value });
				// window.dispatchEvent(
				// 	new ElementLabelChangedEvent({
				// 		id,
				// 		newLabel: inputEl.value,
				// 	}),
				// );
			}
		});
	}
}

customElements.define("sbpm-properties", SbpmProperties);
