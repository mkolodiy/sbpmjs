import * as joint from "@joint/core";
import { SbpmElement } from "./core/element";
import { SbpmElementView } from "./core/element-view";
import { SbpmLink } from "./core/link";
import { SbpmLinkView } from "./core/link-view";
import { SbpmCanvasOrigin } from "./core/origin";
import type { SbpmItemId, UpdateOptions } from "./core/shared/types";
import {
	SbpmFunctionState,
	type SbpmFunctionStateOptions,
	SbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	SbpmFunctionStateTransition,
	type SbpmFunctionStateTransitionOptions,
	SbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import {
	SbpmMessage,
	type SbpmMessageOptions,
	SbpmMessageType,
} from "./sbpm/message";
import {
	SbpmMessageTransition,
	type SbpmMessageTransitionOptions,
	SbpmMessageTransitionType,
} from "./sbpm/message-transition";
import {
	SbpmProcessModel,
	type SbpmProcessModelOptions,
	SbpmProcessModelType,
} from "./sbpm/process-model";
import {
	SbpmProcessNetwork,
	type SbpmProcessNetworkOptions,
	SbpmProcessNetworkType,
} from "./sbpm/process-network";
import {
	SbpmProcessTransition,
	type SbpmProcessTransitionOptions,
	SbpmProcessTransitionType,
} from "./sbpm/process-transition";
import {
	SbpmReceiveState,
	type SbpmReceiveStateOptions,
	SbpmReceiveStateType,
} from "./sbpm/receive-state";
import {
	SbpmReceiveStateTransition,
	type SbpmReceiveStateTransitionOptions,
	SbpmReceiveStateTransitionType,
} from "./sbpm/receive-state-transition";
import {
	SbpmSendState,
	type SbpmSendStateOptions,
	SbpmSendStateType,
} from "./sbpm/send-state";
import {
	SbpmSendStateTransition,
	type SbpmSendStateTransitionOptions,
	SbpmSendStateTransitionType,
} from "./sbpm/send-state-transition";
import {
	SbpmSubject,
	type SbpmSubjectOptions,
	SbpmSubjectType,
} from "./sbpm/subject";
import { CustomEvent, JointEvent } from "./shared/constants";

type EventMap = joint.dia.Paper.EventMap & {
	[JointEvent.ELEMENT_POINTERDOWN]: (
		elementView: SbpmElementView,
		evt: joint.dia.Event,
		x: number,
		y: number,
	) => void;
	[JointEvent.LINK_POINTERDOWN]: (
		linkView: SbpmLinkView,
		evt: joint.dia.Event,
		x: number,
		y: number,
	) => void;
	[JointEvent.LINK_CONNECT]: (
		linkView: SbpmLinkView,
		evt: joint.dia.Event,
		newCellView: joint.dia.CellView,
		newCellViewMagnet: SVGElement,
		arrowhead: joint.dia.LinkEnd,
	) => void;
};

export type ElementEventHandlerParams = SbpmElement;

export type LinkEventHandlerParams = SbpmLink;

export type ElementEventHandler = (element: ElementEventHandlerParams) => void;

export type LinkEventHandler = (link: LinkEventHandlerParams) => void;

export interface SbpmCanvasOptions {
	container: HTMLElement;
	onSelectElement?: ElementEventHandler;
	onSelectLink?: LinkEventHandler;
	onDeleteElement?: ElementEventHandler;
	onDeleteLink?: LinkEventHandler;
	onOpenElement?: ElementEventHandler;
	onOpenLink?: LinkEventHandler;
	onConnectLink?: LinkEventHandler;
	onAddItem?: (
		item: ElementEventHandlerParams | LinkEventHandlerParams,
	) => void;
	onClickCanvas?: () => void;
	onChangeItem?: (element: SbpmElement | SbpmLink) => void;
}

const namespace = {
	...joint.shapes,
	"sbpm.common": { SbpmElement },
	"sbpm.sid": { SbpmSubject },
};

const defaultOptions: joint.dia.Paper.Options = {
	width: "100%",
	height: "100%",
	gridSize: 1,
	linkPinning: false,
	interactive: {
		labelMove: false,
	},
	defaultConnectionPoint: {
		name: "bbox",
		args: {
			offset: 10,
		},
	},
	defaultRouter: { name: "normal" },
	cellViewNamespace: namespace,
	// @ts-expect-error The jointjs override is producing error.
	elementView: SbpmElementView,
	// @ts-expect-error The jointjs override is producing error.
	linkView: SbpmLinkView,
	defaultLink,
	validateConnection,
};

export class SbpmCanvas {
	#graph: joint.dia.Graph;
	#paper: joint.dia.Paper;
	public cleanup: () => void;

	constructor(options: SbpmCanvasOptions) {
		this.#graph = new joint.dia.Graph({}, { cellNamespace: namespace });

		this.#paper = new joint.dia.Paper({
			...defaultOptions,
			el: options.container,
			model: this.#graph,
		});

		this.#paper.el.style.cursor = "grab";

		this.#addOrigin();
		const listener = this.#addDragging(options);
		this.#registerPaperEvents(options);
		this.#registerGraphEvents(options);
		this.#registerElementEvents(options);
		this.#registerLinkEvents(options);

		this.cleanup = () => {
			options.container.removeEventListener("mousemove", listener, true);
			this.#graph.off();
			this.#paper.off();
		};
	}

	#addOrigin(): void {
		this.#graph.addCell(new SbpmCanvasOrigin());
	}

	#addDragging({ container }: SbpmCanvasOptions): (event: MouseEvent) => void {
		let dragStartPosition: joint.dia.Point | undefined;

		this.#paper.on(
			JointEvent.BLANK_POINTERDOWN,
			(_evt: joint.dia.Event, x: number, y: number) => {
				dragStartPosition = { x, y };
			},
		);

		this.#paper.on(
			[JointEvent.CELL_POINTERUP, JointEvent.BLANK_POINTERUP].join(" "),
			() => {
				dragStartPosition = undefined;
			},
		);

		const listener = (evt: MouseEvent) => {
			if (dragStartPosition !== undefined) {
				const scale = this.#paper.scale();

				const x = evt.offsetX - dragStartPosition.x * scale.sx;
				const y = evt.offsetY - dragStartPosition.y * scale.sy;

				this.#paper.translate(x, y);
			}
		};

		container.addEventListener("mousemove", listener, true);
		return listener;
	}

	#registerPaperEvents({ onClickCanvas }: SbpmCanvasOptions): void {
		this.#paper.on(JointEvent.BLANK_POINTERDOWN, () => {
			this.#paper.el.style.cursor = "grabbing";
			this.deselect();
			onClickCanvas?.();
		});

		this.#paper.on(JointEvent.BLANK_POINTERUP, () => {
			this.#paper.el.style.cursor = "grab";
		});
	}

	#registerGraphEvents({ onAddItem }: SbpmCanvasOptions) {
		if (onAddItem) {
			this.#graph.on("add", (item: SbpmElement | SbpmLink) => {
				if (item instanceof SbpmElement || item instanceof SbpmLink) {
					onAddItem(item);
				}
			});
		}
	}

	#registerElementEvents({
		onSelectElement,
		onDeleteElement,
		onChangeItem,
		onOpenElement,
	}: SbpmCanvasOptions): void {
		if (onChangeItem) {
			this.#graph.on("change", (model: SbpmElement | SbpmLink) => {
				onChangeItem(model);
			});
		}

		this.#paper.on<keyof EventMap>(
			JointEvent.ELEMENT_POINTERDOWN,
			(sbpmElementView: SbpmElementView) => {
				this.deselect();
				sbpmElementView.select();
				onSelectElement?.(sbpmElementView.model);
			},
		);

		this.#graph.on(CustomEvent.ELEMENT_UPDATED, (element: SbpmElement) => {
			const elementView = this.#paper.findViewByModel<SbpmElementView>(element);
			elementView.refresh();
		});

		this.#paper.on(
			CustomEvent.ELEMENT_REMOVE,
			(elementView: SbpmElementView, evt: MouseEvent) => {
				evt.stopPropagation();
				elementView.model.remove();
				onDeleteElement?.(elementView.model);
			},
		);

		this.#paper.on(
			CustomEvent.ELEMENT_OPEN,
			(elementView: SbpmElementView, evt: MouseEvent) => {
				evt.stopPropagation();
				onOpenElement?.(elementView.model);
			},
		);
	}

	#registerLinkEvents({
		onSelectLink,
		onDeleteLink,
		onOpenLink,
		onConnectLink,
	}: SbpmCanvasOptions): void {
		this.#paper.on<keyof EventMap>(
			JointEvent.LINK_POINTERDOWN,
			(linkView: SbpmLinkView) => {
				if (linkView.model.hasTarget()) {
					this.deselect();
					linkView.select();
					onSelectLink?.(linkView.model);
				}
			},
		);

		if (onConnectLink) {
			this.#paper.on<keyof EventMap>(
				JointEvent.LINK_CONNECT,
				(linkView: SbpmLinkView) => {
					onConnectLink(linkView.model);
				},
			);
		}

		this.#paper.on(
			CustomEvent.LINK_REMOVE,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				linkView.model.remove();
				onDeleteLink?.(linkView.model);
			},
		);

		this.#paper.on(
			CustomEvent.LINK_REMOVE_VERTICES,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				linkView.model.resetVertices();
			},
		);

		if (onOpenLink) {
			this.#paper.on(
				CustomEvent.LINK_OPEN,
				(linkView: SbpmLinkView, evt: MouseEvent) => {
					evt.stopPropagation();
					onOpenLink(linkView.model);
				},
			);
		}

		this.#graph.on(CustomEvent.LINK_UPDATED, (link: SbpmLink) => {
			const linkView = this.#paper.findViewByModel<SbpmLinkView>(link);
			linkView.refresh();
		});
	}

	public get paper(): joint.dia.Paper {
		return this.#paper;
	}

	public get graph(): joint.dia.Graph {
		return this.#graph;
	}

	public getElements(): Array<SbpmElement> {
		const allElements = this.#graph.getElements();
		return allElements.filter(
			(element: joint.dia.Element) =>
				!element.get("type").includes("sbpm.common."),
		) as Array<SbpmElement>;
	}

	public getLinks(): Array<SbpmLink> {
		const allLinks = this.#graph.getLinks();
		return allLinks.filter(
			(link: joint.dia.Link) => !link.get("type").includes("sbpm.common."),
		) as Array<SbpmLink>;
	}

	public getElement<TType extends SbpmElement = SbpmElement>(
		id: SbpmItemId,
	): TType {
		const element = this.getElements().find((element) => element.id === id);
		if (!element) {
			throw new Error(`Could not find element with the id: ${id}`);
		}
		return element as TType;
	}

	public getLink<TType extends SbpmLink = SbpmLink>(id: SbpmItemId): TType {
		const link = this.getLinks().find((link) => link.id === id);
		if (!link) {
			throw new Error(`Could not find link with the id: ${id}`);
		}
		return link as TType;
	}

	public getItems(): Array<SbpmElement | SbpmLink> {
		return [...this.getElements(), ...this.getLinks()];
	}

	public updateItem<
		TOptions extends
			| SbpmProcessNetworkOptions
			| SbpmProcessModelOptions
			| SbpmSubjectOptions
			| SbpmSendStateOptions
			| SbpmReceiveStateOptions
			| SbpmFunctionStateOptions
			| SbpmMessageOptions
			| SbpmProcessTransitionOptions
			| SbpmMessageTransitionOptions
			| SbpmSendStateTransitionOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmFunctionStateTransitionOptions,
	>(
		options: UpdateOptions<TOptions> & {
			id: TOptions["id"];
			type: TOptions["type"];
		},
	): void {
		const { id, type, ...restOptions } = options;
		switch (type) {
			case SbpmProcessNetworkType:
				this.getElement<SbpmProcessNetwork>(id).update(restOptions);
				break;
			case SbpmProcessModelType:
				this.getElement<SbpmProcessModel>(id).update(restOptions);
				break;
			case SbpmProcessTransitionType:
				this.getLink<SbpmProcessTransition>(id).update(restOptions);
				break;
			case SbpmSubjectType:
				this.getElement<SbpmSubject>(id).update(restOptions);
				break;
			case SbpmMessageTransitionType:
				this.getLink<SbpmMessageTransition>(id).update(restOptions);
				break;
			case SbpmSendStateType:
				this.getElement<SbpmSendState>(id).update(restOptions);
				break;
			case SbpmMessageType:
				this.getElement<SbpmMessage>(id).update(restOptions);
				break;
			case SbpmSendStateTransitionType:
				this.getLink<SbpmSendStateTransition>(id).update(restOptions);
				break;
			case SbpmReceiveStateType:
				this.getElement<SbpmReceiveState>(id).update(restOptions);
				break;
			case SbpmReceiveStateTransitionType:
				this.getLink<SbpmReceiveStateTransition>(id).update(restOptions);
				break;
			case SbpmFunctionStateType:
				this.getElement<SbpmFunctionState>(id).update(restOptions);
				break;
			case SbpmFunctionStateTransitionType:
				this.getLink<SbpmFunctionStateTransition>(id).update(restOptions);
				break;
			default:
				throw new Error("Provided type is not supported.");
		}
	}

	public addItem(
		item:
			| SbpmProcessNetworkOptions
			| SbpmProcessModelOptions
			| SbpmProcessTransitionOptions
			| SbpmSubjectOptions
			| SbpmMessageTransitionOptions
			| SbpmMessageOptions
			| SbpmSendStateOptions
			| SbpmSendStateTransitionOptions
			| SbpmReceiveStateOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmFunctionStateOptions
			| SbpmFunctionStateTransitionOptions,
	): void {
		switch (item.type) {
			case SbpmProcessNetworkType:
				new SbpmProcessNetwork(item).addTo(this.#graph);
				break;
			case SbpmProcessModelType:
				new SbpmProcessModel(item).addTo(this.#graph);
				break;
			case SbpmProcessTransitionType:
				new SbpmProcessTransition(item).addTo(this.#graph);
				break;
			case SbpmSubjectType:
				new SbpmSubject(item).addTo(this.#graph);
				break;
			case SbpmMessageTransitionType:
				new SbpmMessageTransition(item).addTo(this.#graph);
				break;
			case SbpmMessageType:
				new SbpmMessage(item).addTo(this.#graph);
				break;
			case SbpmSendStateType:
				new SbpmSendState(item).addTo(this.#graph);
				break;
			case SbpmSendStateTransitionType:
				new SbpmSendStateTransition(item).addTo(this.#graph);
				break;
			case SbpmReceiveStateType:
				new SbpmReceiveState(item).addTo(this.#graph);
				break;
			case SbpmReceiveStateTransitionType:
				new SbpmReceiveStateTransition(item).addTo(this.#graph);
				break;
			case SbpmFunctionStateType:
				new SbpmFunctionState(item).addTo(this.#graph);
				break;
			case SbpmFunctionStateTransitionType:
				new SbpmFunctionStateTransition(item).addTo(this.#graph);
				break;
			default:
				throw new Error("Provided type is not supported.");
		}
	}

	public addItems(
		items: Array<
			| SbpmProcessNetworkOptions
			| SbpmProcessModelOptions
			| SbpmProcessTransitionOptions
			| SbpmSubjectOptions
			| SbpmMessageTransitionOptions
			| SbpmMessageOptions
			| SbpmSendStateOptions
			| SbpmSendStateTransitionOptions
			| SbpmReceiveStateOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmFunctionStateOptions
			| SbpmFunctionStateTransitionOptions
		>,
	): void {
		this.clear();
		for (const item of items) {
			this.addItem(item);
		}
	}

	public deselect(): void {
		this.#paper.hideTools();
		for (const element of this.getElements()) {
			element.deselect();
		}
		for (const link of this.getLinks()) {
			link.deselect();
		}
	}

	public reset(): void {
		this.#paper.translate(0, 0);
	}

	public clear(): void {
		this.#graph.clear();
		this.#addOrigin();
	}

	public zoomIn(): void {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx + 0.1, scale.sx + 0.1);
	}

	public zoomOut(): void {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx - 0.1, scale.sx - 0.1);
	}
}

function defaultLink(view: joint.dia.CellView): SbpmLink {
	if (view instanceof SbpmElementView) {
		const type = view.model.get("type");
		switch (type) {
			case SbpmProcessNetworkType:
			case SbpmProcessModelType:
				return new SbpmProcessTransition({
					id: crypto.randomUUID(),
					type: "sbpm.pnd.SbpmProcessTransition",
					source: { id: view.model.id },
					target: { id: "" },
				});
			case SbpmSubjectType:
				return new SbpmMessageTransition({
					id: crypto.randomUUID(),
					type: "sbpm.sid.SbpmMessageTransition",
					label: "New message transition",
					source: { id: view.model.id },
					target: { id: "" },
				});
			case SbpmSendStateType:
				return new SbpmSendStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.sbd.SbpmSendStateTransition",
					subject: {
						id: "",
						label: "To some [Subject]",
					},
					message: {
						id: "",
						label: "a [Message]",
					},
					source: { id: view.model.id },
					target: { id: "" },
				});
			case SbpmReceiveStateType:
				return new SbpmReceiveStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.sbd.SbpmReceiveStateTransition",
					subject: {
						id: "",
						label: "From some [Subject]",
					},
					message: {
						id: "",
						label: "a [Message]",
					},
					source: { id: view.model.id },
					target: { id: "" },
				});
			case SbpmFunctionStateType:
				return new SbpmFunctionStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.sbd.SbpmFunctionStateTransition",
					label: "Do something",
					source: { id: view.model.id },
					target: { id: "" },
				});
			default:
				throw new Error("Provided type is not supported.");
		}
	}
	throw new Error("Provided view is not an instance of SbpmElementView.");
}

function validateConnection(
	cellViewSource: joint.dia.CellView,
	_magnetS: unknown,
	cellViewTarget: joint.dia.CellView,
	_magnetT: unknown,
	_end: joint.dia.LinkEnd,
	linkView: joint.dia.LinkView,
): boolean {
	const valid =
		cellViewSource.model.get("id") !== cellViewTarget.model.get("id");
	const isProcessTransitionValid =
		cellViewTarget.model.isElement() &&
		cellViewTarget.model instanceof SbpmProcessModel &&
		linkView.model instanceof SbpmProcessTransition;
	const isMessageTransitionValid =
		cellViewTarget.model.isElement() &&
		cellViewTarget.model instanceof SbpmSubject &&
		linkView.model instanceof SbpmMessageTransition;
	const isSendStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmFunctionState ||
			cellViewTarget.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmSendStateTransition;
	const isReceiveStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmFunctionState ||
			cellViewTarget.model instanceof SbpmSendState) &&
		linkView.model instanceof SbpmReceiveStateTransition;
	const isFunctionStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmSendState ||
			cellViewTarget.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmFunctionStateTransition;

	return (
		valid &&
		(isProcessTransitionValid ||
			isMessageTransitionValid ||
			isSendStateTransitionValid ||
			isReceiveStateTransitionValid ||
			isFunctionStateTransitionValid)
	);
}
