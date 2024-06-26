import * as joint from "@joint/core";
import { CustomEvent, JointEvent, SbpmItemNamespace } from "./common/constants";
import type { SbpmElementType } from "./common/types";
import { combineStrings, getSbpmItemType } from "./common/utils";
import { SbpmElement } from "./core/element";
import { SbpmElementView } from "./core/element-view";
import { SbpmLink } from "./core/link";
import { SbpmLinkView } from "./core/link-view";
import { SbpmCanvasOrigin } from "./core/origin";
import { getDefaultLink, isValidConnection } from "./sbpm/utils";

type PaperOptions = Omit<
	joint.dia.Paper.Options,
	"elementView" | "linkView"
> & {
	elementView?:
		| typeof SbpmElementView
		| ((element: SbpmElement) => typeof SbpmElementView);
	linkView?: typeof SbpmLinkView | ((link: SbpmLink) => typeof SbpmLinkView);
};

const paperOptions: PaperOptions = {
	width: "100%",
	height: "100%",
	gridSize: 1,
	linkPinning: false,
	origin: {
		x: 0,
		y: 0,
	},
	interactive: {
		linkMove: true,
		labelMove: false,
	},
	defaultConnectionPoint: {
		name: "bbox",
		args: {
			offset: 10,
		},
	},
	elementView: SbpmElementView,
	linkView: SbpmLinkView,
	defaultLink,
	validateConnection,
};

function defaultLink(cellView: joint.dia.CellView) {
	const sbpmElementView = cellView as SbpmElementView;
	const type = getSbpmItemType(sbpmElementView.element.get("type")) as Exclude<
		SbpmElementType,
		"Message"
	>;
	return getDefaultLink(type);
}

function validateConnection(
	cellViewS: joint.dia.CellView,
	_magnetS: unknown,
	cellViewT: joint.dia.CellView,
	_magnetT: unknown,
	_end: joint.dia.LinkEnd,
	linkView: joint.dia.LinkView,
) {
	return isValidConnection(cellViewS, cellViewT, linkView);
}

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

export type SbpmModelerOptions = {
	/**
	 * A HTML element where the modeler should be rended to.
	 */
	container: HTMLElement;
	onSelectElement?: ElementEventHandler;
	onSelectLink?: LinkEventHandler;
	onDeleteElement?: ElementEventHandler;
	onDeleteLink?: LinkEventHandler;
	onOpenElement?: ElementEventHandler;
	onOpenLink?: LinkEventHandler;
	onConnectLink?: LinkEventHandler;
	onAddShape?: (
		shape: ElementEventHandlerParams | LinkEventHandlerParams,
	) => void;
	onClickCanvas?: () => void;
};

export class SbpmCanvas {
	#graph: joint.dia.Graph;
	#paper: joint.dia.Paper;
	#dragStartPosition: joint.dia.Point | undefined;

	constructor(options: SbpmModelerOptions) {
		const { container } = options;

		this.#graph = new joint.dia.Graph();
		this.#paper = new joint.dia.Paper({
			...paperOptions,
			el: container,
			model: this.#graph,
			defaultRouter: { name: "normal" },
		});
		// this.#paper.$el.css("cursor", "grab");
		this.#paper.el.style.cursor = "grab";

		this.addOrigin();
		this.addDragging(options);
		this.registerPaperEvents(options);
		this.registerGraphEvents(options);
		this.registerElementEvents(options);
		this.registerLinkEvents(options);
	}

	private addOrigin() {
		this.#graph.addCell(new SbpmCanvasOrigin());
	}

	private addDragging({ container }: SbpmModelerOptions) {
		this.#paper.on(
			JointEvent.BLANK_POINTERDOWN,
			(_evt: joint.dia.Event, x: number, y: number) => {
				this.#dragStartPosition = { x, y };
			},
		);

		this.#paper.on(
			combineStrings([JointEvent.CELL_POINTERUP, JointEvent.BLANK_POINTERUP]),
			() => {
				this.#dragStartPosition = undefined;
			},
		);

		container.addEventListener(
			"mousemove",
			(evt: MouseEvent) => {
				if (this.#dragStartPosition !== undefined) {
					const scale = this.#paper.scale();

					const x = evt.offsetX - this.#dragStartPosition.x * scale.sx;
					const y = evt.offsetY - this.#dragStartPosition.y * scale.sy;

					this.#paper.translate(x, y);
				}
			},
			true,
		);
	}

	private registerElementEvents({ onSelectElement }: SbpmModelerOptions) {
		this.#paper.on<keyof EventMap>(
			JointEvent.ELEMENT_POINTERDOWN,
			(sbpmElementView: SbpmElementView) => {
				this.deselect();
				sbpmElementView.select();
				onSelectElement?.(sbpmElementView.element);
			},
		);

		this.#graph.on(CustomEvent.ELEMENT_UPDATED, (element: SbpmElement) => {
			const elementView = this.#paper.findViewByModel<SbpmElementView>(element);
			elementView.refresh();
		});
	}

	private registerLinkEvents({
		onSelectLink,
		onDeleteLink,
		onOpenLink,
		onConnectLink,
	}: SbpmModelerOptions) {
		this.#paper.on<keyof EventMap>(
			JointEvent.LINK_POINTERDOWN,
			(linkView: SbpmLinkView) => {
				if (linkView.link.hasTarget()) {
					this.deselect();
					linkView.select();
					onSelectLink?.(linkView.link);
				}
			},
		);

		this.#paper.on<keyof EventMap>(
			JointEvent.LINK_CONNECT,
			(linkView: SbpmLinkView) => {
				onConnectLink?.(linkView.link);
			},
		);

		this.#paper.on(
			CustomEvent.LINK_REMOVE,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				linkView.link.remove();
				onDeleteLink?.(linkView.link);
			},
		);

		this.#paper.on(
			CustomEvent.LINK_REMOVE_VERTICES,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				linkView.link.vertices([]);
			},
		);

		this.#paper.on(
			CustomEvent.LINK_OPEN,
			(linkView: SbpmLinkView, evt: MouseEvent) => {
				evt.stopPropagation();
				onOpenLink?.(linkView.link);
			},
		);
	}

	private registerPaperEvents({ onClickCanvas }: SbpmModelerOptions) {
		this.#paper.on(JointEvent.BLANK_POINTERDOWN, () => {
			this.#paper.$el.css("cursor", "grabbing");
			this.deselect();
			onClickCanvas?.();
		});

		this.#paper.on(JointEvent.BLANK_POINTERUP, () => {
			this.#paper.$el.css("cursor", "grab");
			this.deselect();
			onClickCanvas?.();
		});
	}

	private registerGraphEvents({ onAddShape }: SbpmModelerOptions) {
		this.#graph.on("add", (shape: SbpmElement | SbpmLink) => {
			if (shape instanceof SbpmElement || shape instanceof SbpmLink) {
				onAddShape?.(shape);
			}
		});
	}

	/**
	 * Get the jointjs paper instance.
	 *
	 * @returns The jointjs paper instance.
	 */
	public get paper() {
		return this.#paper;
	}

	/**
	 * Get the jointjs graph instance.
	 *
	 * @returns The jointjs graph instance.
	 */
	public get graph() {
		return this.#graph;
	}

	/**
	 * Get all elements that are present on the canvas.
	 *
	 * @returns A list with all elements.
	 */
	public getElements() {
		const allElements = this.#graph.getElements();
		return allElements.filter(
			(element: joint.dia.Element) =>
				!element.get("type").includes(SbpmItemNamespace.COMMON),
		) as SbpmElement[];
	}

	/**
	 * Get all links that are present on the canvas.
	 *
	 * @returns A list with all links.
	 */
	public getLinks() {
		const allLinks = this.#graph.getLinks();
		return allLinks.filter(
			(link: joint.dia.Link) =>
				!link.get("type").includes(SbpmItemNamespace.COMMON),
		) as SbpmLink[];
	}

	/**
	 * Remove selection from all shapes on the canvas.
	 */
	public deselect() {
		this.#paper.hideTools();
		for (const element of this.getElements()) {
			element.deselect();
		}
		for (const link of this.getLinks()) {
			link.deselect();
		}
	}

	/**
	 * Set the origin to 0/0.
	 */
	public reset() {
		this.#paper.translate(0, 0);
	}

	/**
	 * Remove all shapes from the canvas.
	 */
	public clear() {
		this.#graph.clear();
		this.addOrigin();
	}

	/**
	 * Zoom in on the canvas.
	 */
	public zoomIn() {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx + 0.1, scale.sx + 0.1);
	}

	/**
	 * Zoom out on the canvas.
	 */
	public zoomOut() {
		const scale = this.#paper.scale();
		this.#paper.scale(scale.sx - 0.1, scale.sx - 0.1);
	}
}
