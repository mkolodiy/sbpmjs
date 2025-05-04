import type {
	SbpmMessageExchangeType,
	SbpmMultiProcessModelType,
	SbpmProcessModelType,
	SbpmStandardSubjectType,
} from "@sbpmjs/canvas";
import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type {
	SbpmItemId,
	SbpmItemType,
	SbpmProcessType,
	SbpmStandardBehaviorType,
	SbpmStandardLayerType,
} from "../types";
import { isContainerItem } from "../utils";

type PaletteItem = {
	type: SbpmItemType;
	label: string;
};

const paletteItems: {
	[key in
		| SbpmProcessType
		| SbpmMultiProcessModelType
		| SbpmProcessModelType
		| SbpmStandardLayerType
		| SbpmMessageExchangeType
		| SbpmStandardSubjectType
		| SbpmStandardBehaviorType]: Array<PaletteItem>;
} = {
	"sbpm.Process": [
		{
			type: "sbpm.MultiProcessModel",
			label: "Multi process model",
		},
		{
			type: "sbpm.ProcessModel",
			label: "Process model",
		},
	],
	"sbpm.MultiProcessModel": [
		{
			type: "sbpm.StandardLayer",
			label: "Standard layer",
		},
	],
	"sbpm.ProcessModel": [
		{
			type: "sbpm.StandardLayer",
			label: "Standard layer",
		},
	],
	"sbpm.StandardLayer": [
		{
			type: "sbpm.StandardSubject",
			label: "Subject",
		},
	],
	"sbpm.MessageExchange": [
		{
			type: "sbpm.MessageSpecification",
			label: "Message",
		},
	],
	"sbpm.StandardSubject": [
		{
			type: "sbpm.StandardBehavior",
			label: "Behavior",
		},
	],
	"sbpm.StandardBehavior": [
		{
			type: "sbpm.SendState",
			label: "Send state",
		},
		{
			type: "sbpm.ReceiveState",
			label: "Receive state",
		},
		{
			type: "sbpm.FunctionState",
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
