import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { type SbpmItemId, type SbpmItemType, SbpmProcessType } from "../types";
import { State } from "../state";
import {
	SbpmFunctionStateType,
	SbpmMessageTransitionType,
	SbpmMessageType,
	SbpmProcessModelType,
	SbpmReceiveStateType,
	SbpmSendStateType,
	SbpmSubjectType,
} from "@sbpmjs/canvas";
import { isContainerItem } from "../utils";

type PaletteItem = {
	type: SbpmItemType;
	label: string;
};

const paletteItems: {
	[key in
		| typeof SbpmProcessType
		| typeof SbpmProcessModelType
		| typeof SbpmMessageTransitionType
		| typeof SbpmSubjectType]: Array<PaletteItem>;
} = {
	[SbpmProcessType]: [
		{
			type: SbpmProcessModelType,
			label: "Process model",
		},
	],
	[SbpmProcessModelType]: [
		{
			type: SbpmSubjectType,
			label: "Subject",
		},
	],
	[SbpmMessageTransitionType]: [
		{
			type: SbpmMessageType,
			label: "Message",
		},
	],
	[SbpmSubjectType]: [
		{
			type: SbpmSendStateType,
			label: "Send state",
		},
		{
			type: SbpmReceiveStateType,
			label: "Receive state",
		},
		{
			type: SbpmFunctionStateType,
			label: "Function state",
		},
	],
};

export class SbpmPalette extends HTMLElement {
	#shadowRoot: ShadowRoot;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		EventBus.on("item:opened", (data) => {
			this.#render(data.id);
		});
	}

	onDrag(event: DragEvent) {
		if (event.target instanceof HTMLDivElement) {
			event.dataTransfer?.setData("type", event.target.id);
		}
	}

	#render(id: SbpmItemId) {
		const item = State.getItem(id);
		if (!isContainerItem(item)) {
			throw new Error("Currently opened item is not a container item.");
		}
		const template = html`
		<style>
			.sbpm-palette-wrapper {
				padding: 10px;
			}
			.sbpm-palette {
				border: 1px solid #ececec;
				background-color: #f6f6f6;
				width: fit-content;
				padding: 10px;
				pointer-events: all;
			}
			.sbpm-palette-item:hover {
				background-color: #ffffff;
			}
		</style>
		<div class="sbpm-palette-wrapper">
			<div class="sbpm-palette">
				${paletteItems[item.type].map(
					(
						paletteItem,
					) => html`<div class="sbpm-palette-item" id="${paletteItem.type}" draggable="true" @dragstart="${this.onDrag}">${paletteItem.label}

				</div>`,
				)}
			</div>
		</div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-palette", SbpmPalette);
