import * as joint from "@joint/core";
import { CustomEvent, JointEvent } from "./shared/constants";
import { SbpmElement } from "./core/element";
import { SbpmElementView } from "./core/element-view";
import { SbpmLink } from "./core/link";
import { SbpmLinkView } from "./core/link-view";
import { SbpmCanvasOrigin } from "./core/origin";
import {
	SbpmFunctionState,
	type SbpmFunctionStateOptions,
	SbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	SbpmFunctionStateTransition,
	type SbpmFunctionStateTransitionOptions,
} from "./sbpm/function-state-transition";
import {
	SbpmMessageTransition,
	type SbpmMessageTransitionOptions,
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
} from "./sbpm/process-transition";
import {
	SbpmReceiveState,
	type SbpmReceiveStateOptions,
	SbpmReceiveStateType,
} from "./sbpm/receive-state";
import {
	SbpmReceiveStateTransition,
	type SbpmReceiveStateTransitionOptions,
} from "./sbpm/receive-state-transition";
import {
	SbpmSendState,
	type SbpmSendStateOptions,
	SbpmSendStateType,
} from "./sbpm/send-state";
import {
	SbpmSendStateTransition,
	type SbpmSendStateTransitionOptions,
} from "./sbpm/send-state-transition";
import {
	SbpmSubject,
	type SbpmSubjectOptions,
	SbpmSubjectType,
} from "./sbpm/subject";

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

	constructor(options: SbpmCanvasOptions) {
		this.#graph = new joint.dia.Graph({}, { cellNamespace: namespace });

		this.#paper = new joint.dia.Paper({
			...defaultOptions,
			el: options.container,
			model: this.#graph,
		});

		this.#paper.el.style.cursor = "grab";

		this.#addOrigin();
		this.#addDragging(options);
		this.#registerPaperEvents(options);
		this.#registerGraphEvents(options);
		this.#registerElementEvents(options);
		this.#registerLinkEvents(options);
	}

	#addOrigin(): void {
		this.#graph.addCell(new SbpmCanvasOrigin());
	}

	#addDragging({ container }: SbpmCanvasOptions): void {
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

		container.addEventListener(
			"mousemove",
			(evt: MouseEvent) => {
				if (dragStartPosition !== undefined) {
					const scale = this.#paper.scale();

					const x = evt.offsetX - dragStartPosition.x * scale.sx;
					const y = evt.offsetY - dragStartPosition.y * scale.sy;

					this.#paper.translate(x, y);
				}
			},
			true,
		);
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
		this.#graph.on("add", (item: SbpmElement | SbpmLink) => {
			if (item instanceof SbpmElement || item instanceof SbpmLink) {
				onAddItem?.(item);
			}
		});
	}

	#registerElementEvents({
		onSelectElement,
		onDeleteElement,
	}: SbpmCanvasOptions): void {
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

		this.#paper.on<keyof EventMap>(
			JointEvent.LINK_CONNECT,
			(linkView: SbpmLinkView) => {
				onConnectLink?.(linkView.model);
			},
		);

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

		this.#paper.on(
			CustomEvent.LINK_OPEN,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				onOpenLink?.(linkView.model);
			},
		);
	}

	public get paper() {
		return this.#paper;
	}

	public get graph() {
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

	public createSbpmProcessNetwork(
		options: Omit<SbpmProcessNetworkOptions, "type">,
	): SbpmProcessNetwork {
		return new SbpmProcessNetwork({
			type: "sbpm.pnd.SbpmProcessNetwork",
			...options,
		});
	}

	public addSbpmProcessNetwork(
		options: Omit<SbpmProcessNetworkOptions, "type">,
	): SbpmProcessNetwork {
		return this.createSbpmProcessNetwork(options).addTo(this.#graph);
	}

	public createSbpmProcessModel(
		options: SbpmProcessModelOptions,
	): SbpmProcessModel {
		return new SbpmProcessModel(options);
	}

	public addSbpmProcessModel(
		options: SbpmProcessModelOptions,
	): SbpmProcessModel {
		return this.createSbpmProcessModel(options).addTo(this.#graph);
	}

	public createSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return new SbpmSubject(options);
	}

	public addSbpmSubject(options: SbpmSubjectOptions): SbpmSubject {
		return this.createSbpmSubject(options).addTo(this.#graph);
	}

	public createSbpmMessageTransition(
		options: SbpmMessageTransitionOptions,
	): SbpmMessageTransition {
		return new SbpmMessageTransition(options);
	}

	public addSbpmMessageTransition(
		options: SbpmMessageTransitionOptions,
	): SbpmMessageTransition {
		return this.createSbpmMessageTransition(options).addTo(this.#graph);
	}

	public createSbpmSendState(options: SbpmSendStateOptions): SbpmSendState {
		return new SbpmSendState(options);
	}

	public addSbpmSendState(options: SbpmSendStateOptions): SbpmSendState {
		return this.createSbpmSendState(options).addTo(this.#graph);
	}

	public createSbpmReceiveState(
		options: SbpmReceiveStateOptions,
	): SbpmReceiveState {
		return new SbpmReceiveState(options);
	}

	public addSbpmReceiveState(
		options: SbpmReceiveStateOptions,
	): SbpmReceiveState {
		return this.createSbpmReceiveState(options).addTo(this.#graph);
	}

	public createSbpmFunctionState(
		options: SbpmFunctionStateOptions,
	): SbpmFunctionState {
		return new SbpmFunctionState(options);
	}

	public addSbpmFunctionState(
		options: SbpmFunctionStateOptions,
	): SbpmFunctionState {
		return this.createSbpmFunctionState(options).addTo(this.#graph);
	}

	public createSbpmSendStateTransition(
		options: SbpmSendStateTransitionOptions,
	): SbpmSendStateTransition {
		return new SbpmSendStateTransition(options);
	}

	public addSbpmSendStateTransition(
		options: SbpmSendStateTransitionOptions,
	): SbpmSendStateTransition {
		return this.createSbpmSendStateTransition(options).addTo(this.#graph);
	}

	public createSbpmReceiveStateTransition(
		options: SbpmReceiveStateTransitionOptions,
	): SbpmReceiveStateTransition {
		return new SbpmReceiveStateTransition(options);
	}

	public addSbpmReceiveStateTransition(
		options: SbpmReceiveStateTransitionOptions,
	): SbpmReceiveStateTransition {
		return this.createSbpmReceiveStateTransition(options).addTo(this.#graph);
	}

	public createSbpmFunctionStateTransition(
		options: SbpmFunctionStateTransitionOptions,
	): SbpmFunctionStateTransition {
		return new SbpmFunctionStateTransition(options);
	}

	public addSbpmFunctionStateTransition(
		options: SbpmFunctionStateTransitionOptions,
	): SbpmFunctionStateTransition {
		return this.createSbpmFunctionStateTransition(options).addTo(this.#graph);
	}

	public addSbpmItems(
		options: Array<
			| SbpmProcessNetworkOptions
			| SbpmProcessModelOptions
			| SbpmSubjectOptions
			| SbpmSendStateOptions
			| SbpmReceiveStateOptions
			| SbpmFunctionStateOptions
			| SbpmProcessTransitionOptions
			| SbpmMessageTransitionOptions
			| SbpmSendStateTransitionOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmFunctionStateTransitionOptions
		>,
	): void {
		this.clear();
	}

	public deselect() {
		this.#paper.hideTools();
		for (const element of this.getElements()) {
			element.deselect();
		}
		for (const link of this.getLinks()) {
			link.deselect();
		}
	}

	public reset() {
		this.#paper.translate(0, 0);
	}

	public clear() {
		this.#graph.clear();
		this.#addOrigin();
	}

	public zoomIn() {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx + 0.1, scale.sx + 0.1);
	}

	public zoomOut() {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx - 0.1, scale.sx - 0.1);
	}
}

function defaultLink(view: joint.dia.CellView): SbpmLink | joint.dia.Link {
	if (view instanceof SbpmElementView) {
		const type = view.model.get("type");
		switch (type) {
			case SbpmProcessNetworkType:
			case SbpmProcessModelType:
				return new SbpmProcessTransition({
					type: "sbpm.pnd.SbpmProcessTransition",
					source: view.model,
					target: { id: "" },
				});
			case SbpmSubjectType:
				return new SbpmMessageTransition({
					type: "sbpm.sid.SbpmMessageTransition",
					label: "New message transition",
					source: view.model,
					target: { id: "" },
				});
			case SbpmSendStateType:
				return new SbpmSendStateTransition({
					type: "sbpm.pnd.SbpmSendStateTransition",
					subject: "To some [Subject]",
					message: "a [Message]",
					source: view.model,
					target: { id: "" },
				});
			case SbpmReceiveStateType:
				return new SbpmReceiveStateTransition({
					type: "sbpm.pnd.SbpmReceiveStateTransition",
					subject: "From some [Subject]",
					message: "a [Message]",
					source: view.model,
					target: { id: "" },
				});
			case SbpmFunctionStateType:
				return new SbpmFunctionStateTransition({
					type: "sbpm.pnd.SbpmFunctionStateTransition",
					message: "Do something",
					source: view.model,
					target: { id: "" },
				});
			default:
				return new SbpmLink();
		}
	}
	return new joint.dia.Link();
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
