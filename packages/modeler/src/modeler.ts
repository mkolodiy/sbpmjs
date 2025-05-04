import {
	SbpmCanvas,
	isLinkType,
	isElementType,
	isValidItem,
} from "@sbpmjs/canvas";
import { html, render } from "lit-html";
import "./components/sbpm-item-selector";
import "./components/sbpm-palette";
import "./components/sbpm-properties";
import { EventBus } from "./event-bus";
import { State } from "./state";
import {
	type SbpmItemId,
	type SbpmItemOptions,
	sbpmProcessType,
} from "./types";
import { getDefaultElementOptions, isContainerItem } from "./utils";

export interface SbpmModelerOptions {
	container: HTMLElement;
}

export class SbpmModeler {
	#canvas: SbpmCanvas;
	#openedItemId: SbpmItemId;

	constructor(options: SbpmModelerOptions) {
		this.#openedItemId = "";

		const template = html`
			<style>
				.sbpm-container {
					width: 100%;
					position: absolute;
					display: grid;
					grid-template-columns: 1fr 3fr 1fr;
    				gap: 10px;
					z-index: 1;
					pointer-events: none;
				}
			</style>
			<div class="sbpm-container">
				<sbpm-palette></sbpm-palette>
				<sbpm-item-selector></sbpm-item-selector>
				<sbpm-properties></sbpm-properties>
			</div>
			<div id="sbpm-canvas" @drop="${this.#onDrop}" @dragover="${this.#onAllowDrop}"></div>`;
		render(template, options.container);

		const canvasContainer =
			options.container.querySelector<HTMLElement>("#sbpm-canvas");
		if (!canvasContainer) {
			throw new Error("Could not find the canvas container element.");
		}

		this.#canvas = new SbpmCanvas({
			container: canvasContainer,
			onOpenElement: (element) => {
				EventBus.trigger("item:deselected", undefined);
				EventBus.trigger("item:opened", { id: element.id });
			},
			onOpenLink: (link) => {
				EventBus.trigger("item:deselected", undefined);
				EventBus.trigger("item:opened", { id: link.id });
			},
			onSelectElement: (element) => {
				console.log(element.id);

				EventBus.trigger("item:selected", {
					id: element.id,
				});
			},
			onSelectLink: (link) => {
				EventBus.trigger("item:selected", { id: link.id });
			},
			onChangeItem: (item) => {
				if (!State.exists(item.id)) {
					return;
				}
				if (item.isElement()) {
					State.updateItem(item.id, {
						position: item.options().position,
					});
				} else {
					State.updateItem(item.id, {
						vertices: item.options().vertices,
					});
				}
			},
			onClickCanvas: () => {
				EventBus.trigger("item:deselected", undefined);
			},
			onConnectLink: (link) => {
				const item = link.options();
				if (isValidItem(item)) {
					if (item.type === "sbpm.MessageExchange") {
						item.contains = [];
					}
					const parentItem = State.getItem(this.#openedItemId);
					if (!isContainerItem(parentItem)) {
						throw new Error(
							"Could not add element to parent item because it can't contain child items.",
						);
					}

					State.setItem(item.id, item);

					State.updateItem(this.#openedItemId, {
						contains: [...parentItem.contains, item.id],
					});
				}
			},
		});

		EventBus.on("item:updated", (data) => {
			const item = State.getItem(data.id);
			if (isValidItem(item)) {
				this.#canvas.updateItem(item);
			}
		});

		EventBus.on("item:opened", (data) => {
			this.#openedItemId = data.id;
			const item = State.getItem(data.id);
			if (isContainerItem(item)) {
				const children = item.contains
					.map((id) => State.getItem(id))
					.filter(isValidItem);
				this.#canvas.addItems(children);
				const shouldAddItems = children.every(isValidItem);
				if (shouldAddItems) {
					this.#canvas.addItems(children);
				}
			}
		});

		this.#init();
	}

	#init(): void {
		const processNetworkOptions = getDefaultElementOptions(
			"sbpm.ProcessNetwork",
		);
		processNetworkOptions.position = { x: 100, y: 100 };
		State.setItem(processNetworkOptions.id, processNetworkOptions);

		const processOptions = getDefaultElementOptions(sbpmProcessType);
		processOptions.contains.push(processNetworkOptions.id);
		State.setItem(processOptions.id, processOptions);

		EventBus.trigger("item:opened", { id: processOptions.id });
	}

	#onDrop = (event: DragEvent) => {
		event.preventDefault();

		const type = event.dataTransfer?.getData("type");
		if (!isElementType(type)) {
			throw new Error("Element type not provided.");
		}

		const parentItem = State.getItem(this.#openedItemId);
		if (!isContainerItem(parentItem)) {
			throw new Error(
				"Could not add element to parent item because it can't contain child items.",
			);
		}

		const newItem = getDefaultElementOptions(type);
		if ("position" in newItem) {
			const translate = this.#canvas.paper.translate();
			newItem.position = {
				x: event.offsetX - translate.tx,
				y: event.offsetY - translate.ty,
			};
		}
		State.setItem(newItem.id, newItem);

		console.log("onDrop", newItem.id);

		State.updateItem(this.#openedItemId, {
			contains: [...parentItem.contains, newItem.id],
		});

		if (isValidItem(newItem)) {
			this.#canvas.addItem(newItem);
		}
	};

	#onAllowDrop(event: DragEvent) {
		event.preventDefault();
	}

	public addItems(items: Array<SbpmItemOptions>): void {
		State.clear();
		const process = items.find((item) => item.type === "sbpm.Process");
		if (!process) {
			throw new Error("Please provide an item with the type: sbpm.Process");
		}
		const links = items
			.filter((item) => isLinkType(item.type))
			.map((item) => item.id);
		for (const item of items) {
			if (isContainerItem(item)) {
				item.contains.sort((itemAId) => (links.includes(itemAId) ? 1 : -1));
			}
		}
		for (const item of items) {
			State.setItem(item.id, item);
		}
		EventBus.trigger("item:opened", { id: process.id });
	}
}
