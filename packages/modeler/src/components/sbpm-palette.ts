import type {
	SbpmMessageExchangeType,
	SbpmMultiProcessModelType,
	SbpmProcessModelType,
	SbpmStandardBehaviorType,
	SbpmStandardLayerType,
	SbpmStandardSubjectType,
} from "@sbpmjs/canvas";
import { html, render } from "lit-html";
import { EventBus } from "../event-bus";
import { State } from "../state";
import type { SbpmItemId, SbpmItemType, SbpmProcessType } from "../types";
import { isContainerItem } from "../utils";

type PaletteItem = {
	type: SbpmItemType;
	label: string;
	unique?: boolean;
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
			unique: true,
		},
	],
	"sbpm.ProcessModel": [
		{
			type: "sbpm.StandardLayer",
			label: "Standard layer",
			unique: true,
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
			unique: true,
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
	#currentItemId: SbpmItemId | undefined;

	constructor() {
		super();
		this.#shadowRoot = this.attachShadow({ mode: "open" });
		this.#currentItemId = undefined;
	}

	connectedCallback() {
		EventBus.on("item:opened", (data) => {
			this.#render(data.id);
		});
		EventBus.on("item:updated", (data) => {
			if (data.id === this.#currentItemId) {
				this.#render(data.id);
			}
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
		this.#currentItemId = id;

		console.log("Rendering palette for item:", item);

		const hasChildItem = (type: string): boolean =>
			item.contains.some((childId) => State.getItem(childId)?.type === type);

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
			.sbpm-palette-item-disabled {
				opacity: 0.5;
				pointer-events: none;
				cursor: not-allowed;
			}
		</style>
		<div class="sbpm-palette-wrapper">
			<div class="sbpm-palette">
				${paletteItems[item.type].map((paletteItem) => {
					const classes = ["sbpm-palette-item"];
					if (paletteItem.unique && hasChildItem(paletteItem.type)) {
						classes.push("sbpm-palette-item-disabled");
					}
					return html`<div class="${classes.join(" ")}" id="${paletteItem.type}" draggable="true" @dragstart="${this.onDrag}">${paletteItem.label}
					</div>`;
				})}
			</div>
		</div>`;
		render(template, this.#shadowRoot);
	}
}

customElements.define("sbpm-palette", SbpmPalette);
