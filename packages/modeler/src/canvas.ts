import * as joint from "@joint/core";
import { CustomEvent, JointEvent } from "./common/constants";
import { SbpmElement } from "./core/element";
import { SbpmElementView } from "./core/element-view";
import { SbpmLink } from "./core/link";
import { SbpmLinkView } from "./core/link-view";
import { SbpmCanvasOrigin } from "./core/origin";
import { SbpmMessageTransition } from "./sbpm/message-transition";
import { SbpmSubject, SbpmSubjectType } from "./sbpm/subject";

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

	#registerElementEvents({ onSelectElement }: SbpmCanvasOptions): void {
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

	public get graph() {
		return this.#graph;
	}

	public addElement(item: SbpmElement) {
		this.#graph.addCell(item);
	}

	public addLink(link: SbpmLink) {
		this.#graph.addCell(link);
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

	public deselect() {
		this.#paper.hideTools();
		for (const element of this.getElements()) {
			element.deselect();
		}
		for (const link of this.getLinks()) {
			link.deselect();
		}
	}
}

function defaultLink(view: joint.dia.CellView): SbpmLink | joint.dia.Link {
	if (view instanceof SbpmElementView) {
		const type = view.model.get("type");
		switch (type) {
			case SbpmSubjectType:
				return new SbpmMessageTransition({
					label: "New message transition",
					source: view.model,
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
	const isMessageTransitionValid =
		cellViewTarget.model.isElement() &&
		cellViewTarget.model instanceof SbpmSubject &&
		linkView.model instanceof SbpmMessageTransition;

	return valid && isMessageTransitionValid;
}
