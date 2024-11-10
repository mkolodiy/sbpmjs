import { SbpmCanvas, type SbpmProcessNetworkOptions } from "@sbpmjs/canvas";
import "./components/sbpm-canvas";
import "./components/sbpm-modeler";
import "./components/sbpm-properties";
import "./components/sbpm-item-selector";
import { getState } from "./state";
import {
	ElementSelectedEvent,
	listenForItemUpdatedEvent,
} from "./custom-events";
import { html, render } from "lit-html";

declare module "@sbpmjs/canvas" {
	interface SbpmProcessNetworkOptions {
		contains: Array<unknown>;
	}
}

export interface SbpmModelerOptions {
	container: HTMLElement;
}

export class SbpmModeler {
	#canvas: SbpmCanvas;

	constructor(options: SbpmModelerOptions) {
		// const sbpmModelerComponent = document.createElement("sbpm-modeler");
		// options.container.appendChild(sbpmModelerComponent);

		// const sbpmItemSelectorComponent =
		// document.createElement("sbpm-item-selector");
		// options.container.appendChild(sbpmItemSelectorComponent);

		// const sbpmPropertiesComponent = document.createElement("sbpm-properties");
		// options.container.appendChild(sbpmPropertiesComponent);

		// const divEl = document.createElement("div");
		// options.container.appendChild(sbpmCanvasComponent);

		const template = html`<div id="sbpm-canvas-container"></div><sbpm-canvas></sbpm-canvas>`;
		render(template, options.container);

		// const sbpmCanvasComponent =
		// 	options.container.getElementsByTagName("sbpm-canvas");
		// console.log(
		// 	sbpmCanvasComponent.item(0)?.shadowRoot?.getElementById("sbpm-canvas"),
		// );
		// sbpmCanvasComponent.item(0)?.shadowRoot?.appendChild(divEl);

		// if (!sbpmCanvasComponent) {
		// 	throw new Error("sbpm-canvas not present");
		// }
		const divEl = document.getElementById("sbpm-canvas-container");

		this.#canvas = new SbpmCanvas({
			container: divEl,
			onSelectElement: (element) => {
				console.log(element.id);

				window.dispatchEvent(new ElementSelectedEvent({ id: element.id }));
			},
			onChangePositionElement: (element, position) => {
				console.log("exec");

				getState().updateItem(element.id as string, {
					position,
				});
			},
			onClickCanvas: () => {
				// this.#canvas.deselect();
				window.dispatchEvent(new CustomEvent("element-deselected"));
			},
		});

		const processNetworkId = crypto.randomUUID();
		const processNetworkOptions: SbpmProcessNetworkOptions = {
			contains: [],
			label: "Test",
			position: { x: 100, y: 100 },
			type: "sbpm.pnd.SbpmProcessNetwork",
			id: processNetworkId,
		};

		this.#canvas.addSbpmProcessModel({
			id: crypto.randomUUID(),
			label: "Model",
			position: {
				x: 600,
				y: 200,
			},
			type: "sbpm.pnd.SbpmProcessModel",
		});

		getState().setItem(processNetworkId, processNetworkOptions);

		this.#canvas.addSbpmProcessNetwork(processNetworkOptions);

		listenForItemUpdatedEvent((event) => {
			const newItem = event.detail;
			// const newItem = getState().updateItem(detail.id, {
			// 	label: detail.label,
			// });
			// Pass all options to the updateElement function.
			// Only the relevant options will be updated.
			this.#canvas.updateElement(newItem);
		});

		// window.addEventListener("element-label-changed", (event) => {
		// 	if (event instanceof ElementLabelChangedEvent) {
		// 		const detail = event.detail;
		// 		const newItem = getState().updateItem(detail.id, {
		// 			label: detail.newLabel,
		// 		});
		// 		// Pass all options to the updateElement function.
		// 		// Only the relevant options will be updated.
		// 		this.#canvas.updateElement(newItem);
		// 	}
		// });

		window.addEventListener("element-added", (event) => {
			if (event instanceof CustomEvent) {
				const detail = event.detail;
				const item = getState().getItem(detail);
				this.#canvas.addSbpmElement(item);
			}
		});

		setInterval(() => {
			console.log(Array.from(getState().items.entries()));
		}, 10000);
	}
}
