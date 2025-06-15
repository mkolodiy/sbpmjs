import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type { SbpmItemId } from "../types";

export class SbpmModeler extends HTMLElement {
	#shadowRoot: ShadowRoot;
	#openedItemId: SbpmItemId;

	constructor() {
		super();
		this.#openedItemId = "";
		this.#shadowRoot = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		EventBus.on("item:opened", (data) => {
			this.#openedItemId = data.id;
			this.#render(data.id);
		});
		EventBus.on("item:updated", (data) => {
			if (data.id === this.#openedItemId) {
				this.#render(data.id);
			}
		});
	}

	#handleChange(event: Event) {
		if (event.target instanceof HTMLSelectElement) {
			EventBus.trigger("item:deselected", undefined);
			EventBus.trigger("item:opened", { id: event.target.value });
		}
	}

	#render(id: SbpmItemId) {
		const items = State.getItems().filter((item) => "contains" in item);
		const openedItem = State.getItem(id);

		const template = html`
		<style>
			.sbpm-item-selector {
				display: flex;
				justify-content: center;
				padding-top: 10px;
				pointer-events: all;
			}
		</style>
		<div class="sbpm-item-selector">
			<select name="item" id="item" @change=${this.#handleChange}>
				${items.map((item) => html`<option value=${item.id} ?selected=${item.id === openedItem.id}>${item.label}</option>`)}
			</select>
		</div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-item-selector", SbpmModeler);
