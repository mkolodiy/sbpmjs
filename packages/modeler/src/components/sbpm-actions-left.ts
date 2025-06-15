import { html, render } from "lit-html";
import { State } from "../state";
import { EventBus } from "../event-bus";

export class SbpmActionsLeft extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#render("");
		EventBus.on("item:updated", () => {
			this.#render(this.#generateUrl());
		});
	}

	#generateUrl = () => {
		const content = JSON.stringify(State.getItems());
		const blob = new Blob([content], {
			type: "application/json",
		});
		return URL.createObjectURL(blob);
	};

	#render(downloadUrl: string) {
		const template = html`
        <style>
            .sbpm-actions-wrapper {
                padding: 10px;
            }
            .sbpm-actions {
                border: 1px solid #ececec;
                background-color: #f6f6f6;
                width: fit-content;
                padding: 10px;
                pointer-events: all;
                height: 20px
            }
            .sbpm-actions-download {
                height: 24px;
                width: 24px;
            }
        </style>
        <div class="sbpm-actions-wrapper">
            <div class="sbpm-actions">
                <a download="process.json" href=${downloadUrl} title="Download as JSON file"><svg class="sbpm-actions-download" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></a>
            </div>
        </div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-actions-left", SbpmActionsLeft);
