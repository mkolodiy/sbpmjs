import { html, render } from "lit-html";
import { EventBus } from "../event-bus";

interface SbpmActions {
	zoomIn: () => void;
	zoomOut: () => void;
	resetCanvas: () => void;
	clearCanvas: () => void;
}

export class SbpmActionsRight extends HTMLElement {
	#shadowRoot: ShadowRoot;
	#actions: SbpmActions;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
		this.#actions = {
			zoomIn: () => {},
			zoomOut: () => {},
			resetCanvas: () => {},
			clearCanvas: () => {},
		};
	}

	set actions(actions: SbpmActions) {
		this.#actions = actions;
	}

	connectedCallback() {
		this.#render();
		EventBus.on("item:updated", () => {
			this.#render();
		});
	}

	#render() {
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
                height: 20px;
                gap: 10px;
                display: flex;
            }
            .sbpm-actions-icon {
                height: 24px;
                width: 24px;
            }
            .button {
                all: unset;
                cursor: pointer;
            }
        </style>
        <div class="sbpm-actions-wrapper">
            <div class="sbpm-actions">
                <button class="button" title="Reset canvas" @click=${this.#actions.resetCanvas}><svg class="sbpm-actions-icon" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="M480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z"/></svg></button>
                <button class="button" title="Clear canvas" @click=${this.#actions.clearCanvas}><svg class="sbpm-actions-icon" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                <button class="button" title="Zoom in" @click=${this.#actions.zoomIn}><svg class="sbpm-actions-icon" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Zm-40-60v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg></button>
                <button class="button" title="Zoom out" @click=${this.#actions.zoomOut}><svg <svg class="sbpm-actions-icon" fill="#1f1f1f" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400ZM280-540v-80h200v80H280Z"/></svg></button>
            </div>
        </div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-actions-right", SbpmActionsRight);
