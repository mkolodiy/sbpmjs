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
	type SbpmFunctionStateType,
} from "./sbpm/function-state";
import {
	SbpmFunctionStateTransition,
	type SbpmFunctionStateTransitionOptions,
	type SbpmFunctionStateTransitionType,
} from "./sbpm/function-state-transition";
import {
	SbpmInterfaceSubject,
	type SbpmInterfaceSubjectOptions,
	type SbpmInterfaceSubjectType,
} from "./sbpm/interface-subject";
import {
	SbpmMessageExchange,
	type SbpmMessageExchangeOptions,
	type SbpmMessageExchangeType,
} from "./sbpm/message-exchange";
import {
	SbpmMessageSpecification,
	type SbpmMessageSpecificationOptions,
	type SbpmMessageSpecificationType,
} from "./sbpm/message-specification";
import {
	SbpmMultiProcessModel,
	type SbpmMultiProcessModelOptions,
	type SbpmMultiProcessModelType,
} from "./sbpm/multi-process-model";
import {
	SbpmProcessModel,
	type SbpmProcessModelOptions,
	type SbpmProcessModelType,
} from "./sbpm/process-model";
import {
	SbpmProcessNetwork,
	type SbpmProcessNetworkOptions,
	type SbpmProcessNetworkType,
} from "./sbpm/process-network";
import {
	SbpmProcessNetworkTransition,
	type SbpmProcessNetworkTransitionOptions,
	type SbpmProcessNetworkTransitionType,
} from "./sbpm/process-network-transition";
import {
	SbpmReceiveState,
	type SbpmReceiveStateOptions,
	type SbpmReceiveStateType,
} from "./sbpm/receive-state";
import {
	SbpmReceiveStateTransition,
	type SbpmReceiveStateTransitionOptions,
	type SbpmReceiveStateTransitionType,
} from "./sbpm/receive-state-transition";
import {
	SbpmSendState,
	type SbpmSendStateOptions,
	type SbpmSendStateType,
} from "./sbpm/send-state";
import {
	SbpmSendStateTransition,
	type SbpmSendStateTransitionOptions,
	type SbpmSendStateTransitionType,
} from "./sbpm/send-state-transition";
import {
	SbpmStandardBehavior,
	type SbpmStandardBehaviorOptions,
	type SbpmStandardBehaviorType,
} from "./sbpm/standard-behavior";
import {
	SbpmStandardLayer,
	type SbpmStandardLayerOptions,
	type SbpmStandardLayerType,
} from "./sbpm/standard-layer";
import {
	SbpmStandardSubject,
	type SbpmStandardSubjectOptions,
	type SbpmStandardSubjectType,
} from "./sbpm/standard-subject";
import { CustomEvent, JointEvent } from "./shared/constants";
import {
	autoRenewIcon,
	blueDotIcon,
	callMadeIcon,
	deleteIcon,
	openInNew,
	redDotIcon,
	touchAppIcon,
} from "./shared/icons";
import type { Icons } from "./shared/types";
import { isElementType } from "./shared/utils";

declare module "@joint/core" {
	namespace dia {
		interface Graph {
			icons: Icons;
		}
	}
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
	icons?: {
		deleteIcon?: string;
		touchAppIcon?: string;
		callMadeIcon?: string;
		autoRenewIcon?: string;
		openInNew?: string;
		blueDotIcon?: string;
		redDotIcon?: string;
	};
}

const namespace = {
	...joint.shapes,
	"sbpm.internal": { SbpmCanvasOrigin },
	sbpm: {
		SbpmFunctionStateTransition,
		SbpmFunctionState,
		SbpmInterfaceSubject,
		SbpmMessageExchange,
		SbpmMessageSpecification,
		SbpmMultiProcessModel,
		SbpmProcessModel,
		SbpmProcessNetworkTransition,
		SbpmProcessNetwork,
		SbpmReceiveStateTransition,
		SbpmReceiveState,
		SbpmSendStateTransition,
		SbpmSendState,
		SbpmStandardBehavior,
		SbpmStandardLayer,
		SbpmStandardSubject,
	},
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

		this.#graph.icons = {
			deleteIcon: options.icons?.deleteIcon ?? deleteIcon,
			touchAppIcon: options.icons?.touchAppIcon ?? touchAppIcon,
			callMadeIcon: options.icons?.callMadeIcon ?? callMadeIcon,
			autoRenewIcon: options.icons?.autoRenewIcon ?? autoRenewIcon,
			openInNew: options.icons?.openInNew ?? openInNew,
			blueDotIcon: options.icons?.blueDotIcon ?? blueDotIcon,
			redDotIcon: options.icons?.redDotIcon ?? redDotIcon,
		};

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
		TType extends
			| SbpmFunctionStateTransitionType
			| SbpmFunctionStateType
			| SbpmInterfaceSubjectType
			| SbpmMessageExchangeType
			| SbpmMessageSpecificationType
			| SbpmMultiProcessModelType
			| SbpmProcessModelType
			| SbpmProcessNetworkTransitionType
			| SbpmProcessNetworkType
			| SbpmReceiveStateTransitionType
			| SbpmReceiveStateType
			| SbpmSendStateTransitionType
			| SbpmSendStateType
			| SbpmStandardBehaviorType
			| SbpmStandardLayerType
			| SbpmStandardSubjectType,
		TOptions extends TType extends "sbpm.FunctionStateTransition"
			? SbpmFunctionStateTransitionOptions
			: TType extends "sbpm.FunctionState"
				? SbpmFunctionStateOptions
				: TType extends "sbpm.InterfaceSubject"
					? SbpmInterfaceSubjectOptions
					: TType extends "sbpm.MessageExchange"
						? SbpmMessageExchangeOptions
						: TType extends "sbpm.MessageSpecification"
							? SbpmMessageSpecificationOptions
							: TType extends "sbpm.MultiProcessModel"
								? SbpmMultiProcessModelOptions
								: TType extends "sbpm.ProcessModel"
									? SbpmProcessModelOptions
									: TType extends "sbpm.ProcessNetworkTransition"
										? SbpmProcessNetworkTransitionOptions
										: TType extends "sbpm.ProcessNetwork"
											? SbpmProcessNetworkOptions
											: TType extends "sbpm.ReceiveStateTransition"
												? SbpmReceiveStateTransitionOptions
												: TType extends "sbpm.ReceiveState"
													? SbpmReceiveStateOptions
													: TType extends "sbpm.SendStateTransition"
														? SbpmSendStateTransitionOptions
														: TType extends "sbpm.SendState"
															? SbpmSendStateOptions
															: TType extends "sbpm.StandardBehavior"
																? SbpmStandardBehaviorOptions
																: TType extends "sbpm.StandardLayer"
																	? SbpmStandardLayerOptions
																	: TType extends "sbpm.StandardSubject"
																		? SbpmStandardSubjectOptions
																		: never,
	>(options: UpdateOptions<TOptions> & { id: SbpmItemId; type: TType }): void {
		const { id, type, ...restOptions } = options;
		switch (type) {
			case "sbpm.FunctionStateTransition":
				this.getLink<SbpmFunctionStateTransition>(id).update(restOptions);
				break;
			case "sbpm.FunctionState":
				this.getElement<SbpmFunctionState>(id).update(restOptions);
				break;
			case "sbpm.InterfaceSubject":
				this.getElement<SbpmInterfaceSubject>(id).update(restOptions);
				break;
			case "sbpm.MessageExchange":
				this.getLink<SbpmMessageExchange>(id).update(restOptions);
				break;
			case "sbpm.MessageSpecification":
				this.getElement<SbpmMessageSpecification>(id).update(restOptions);
				break;
			case "sbpm.MultiProcessModel":
				this.getElement<SbpmMultiProcessModel>(id).update(restOptions);
				break;
			case "sbpm.ProcessModel":
				this.getElement<SbpmProcessModel>(id).update(restOptions);
				break;
			case "sbpm.ProcessNetworkTransition":
				this.getLink<SbpmProcessNetworkTransition>(id).update(restOptions);
				break;
			case "sbpm.ProcessNetwork":
				this.getElement<SbpmProcessNetwork>(id).update(restOptions);
				break;
			case "sbpm.SendStateTransition":
				this.getLink<SbpmSendStateTransition>(id).update(restOptions);
				break;
			case "sbpm.SendState":
				this.getElement<SbpmSendState>(id).update(restOptions);
				break;
			case "sbpm.ReceiveStateTransition":
				this.getLink<SbpmReceiveStateTransition>(id).update(restOptions);
				break;
			case "sbpm.ReceiveState":
				this.getElement<SbpmReceiveState>(id).update(restOptions);
				break;
			case "sbpm.StandardBehavior":
				this.getElement<SbpmStandardBehavior>(id).update(restOptions);
				break;
			case "sbpm.StandardLayer":
				this.getElement<SbpmStandardLayer>(id).update(restOptions);
				break;
			case "sbpm.StandardSubject":
				this.getElement<SbpmStandardSubject>(id).update(restOptions);
				break;
			default:
				throw new Error("Provided type is not supported.");
		}
	}

	public addItem(
		item:
			| SbpmFunctionStateTransitionOptions
			| SbpmFunctionStateOptions
			| SbpmInterfaceSubjectOptions
			| SbpmMessageExchangeOptions
			| SbpmMessageSpecificationOptions
			| SbpmMultiProcessModelOptions
			| SbpmProcessModelOptions
			| SbpmProcessNetworkTransitionOptions
			| SbpmProcessNetworkOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmReceiveStateOptions
			| SbpmSendStateTransitionOptions
			| SbpmSendStateOptions
			| SbpmStandardBehaviorOptions
			| SbpmStandardLayerOptions
			| SbpmStandardSubjectOptions,
	): void {
		switch (item.type) {
			case "sbpm.FunctionStateTransition":
				new SbpmFunctionStateTransition(item).addTo(this.#graph);
				break;
			case "sbpm.FunctionState":
				new SbpmFunctionState(item).addTo(this.#graph);
				break;
			case "sbpm.InterfaceSubject":
				new SbpmInterfaceSubject(item).addTo(this.#graph);
				break;
			case "sbpm.MessageExchange":
				new SbpmMessageExchange(item).addTo(this.#graph);
				break;
			case "sbpm.MessageSpecification":
				new SbpmMessageSpecification(item).addTo(this.#graph);
				break;
			case "sbpm.MultiProcessModel":
				new SbpmMultiProcessModel(item).addTo(this.#graph);
				break;
			case "sbpm.ProcessModel":
				new SbpmProcessModel(item).addTo(this.#graph);
				break;
			case "sbpm.ProcessNetworkTransition":
				new SbpmProcessNetworkTransition(item).addTo(this.#graph);
				break;
			case "sbpm.ProcessNetwork":
				new SbpmProcessNetwork(item).addTo(this.#graph);
				break;
			case "sbpm.ReceiveStateTransition":
				new SbpmReceiveStateTransition(item).addTo(this.#graph);
				break;
			case "sbpm.ReceiveState":
				new SbpmReceiveState(item).addTo(this.#graph);
				break;
			case "sbpm.SendStateTransition":
				new SbpmSendStateTransition(item).addTo(this.#graph);
				break;
			case "sbpm.SendState":
				new SbpmSendState(item).addTo(this.#graph);
				break;
			case "sbpm.StandardBehavior":
				new SbpmStandardBehavior(item).addTo(this.#graph);
				break;
			case "sbpm.StandardLayer":
				new SbpmStandardLayer(item).addTo(this.#graph);
				break;
			case "sbpm.StandardSubject":
				new SbpmStandardSubject(item).addTo(this.#graph);
				break;
			default:
				throw new Error("Provided type is not supported.");
		}
	}

	public addItems(
		items: Array<
			| SbpmFunctionStateTransitionOptions
			| SbpmFunctionStateOptions
			| SbpmInterfaceSubjectOptions
			| SbpmMessageExchangeOptions
			| SbpmMessageSpecificationOptions
			| SbpmMultiProcessModelOptions
			| SbpmProcessModelOptions
			| SbpmProcessNetworkTransitionOptions
			| SbpmProcessNetworkOptions
			| SbpmReceiveStateTransitionOptions
			| SbpmReceiveStateOptions
			| SbpmSendStateTransitionOptions
			| SbpmSendStateOptions
			| SbpmStandardBehaviorOptions
			| SbpmStandardLayerOptions
			| SbpmStandardSubjectOptions
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
		this.#paper.scale(1, 1);
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
		if (!isElementType(type)) {
			throw new Error("Invalid element type");
		}
		switch (type) {
			case "sbpm.ProcessNetwork":
			case "sbpm.MultiProcessModel":
			case "sbpm.ProcessModel":
				return new SbpmProcessNetworkTransition({
					id: crypto.randomUUID(),
					type: "sbpm.ProcessNetworkTransition",
					label: "New process transition",
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
				});
			case "sbpm.StandardSubject":
				return new SbpmMessageExchange({
					id: crypto.randomUUID(),
					type: "sbpm.MessageExchange",
					label: "New message transition",
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
				});
			case "sbpm.InterfaceSubject":
				return new SbpmMessageExchange({
					id: crypto.randomUUID(),
					type: "sbpm.MessageExchange",
					label: "New message transition",
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
				});
			case "sbpm.SendState":
				return new SbpmSendStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.SendStateTransition",
					label: "Send state transition",
					receiverSubject: undefined,
					message: undefined,
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
				});
			case "sbpm.ReceiveState":
				return new SbpmReceiveStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.ReceiveStateTransition",
					label: "Receive state transition",
					senderSubject: undefined,
					message: undefined,
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
				});
			case "sbpm.FunctionState":
				return new SbpmFunctionStateTransition({
					id: crypto.randomUUID(),
					type: "sbpm.FunctionStateTransition",
					label: "Do something",
					fromElement: view.model.id as SbpmItemId,
					toElement: "",
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
		(cellViewTarget.model instanceof SbpmProcessModel ||
			cellViewTarget.model instanceof SbpmMultiProcessModel) &&
		linkView.model instanceof SbpmProcessNetworkTransition;
	const isMessageExchangeValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmStandardSubject ||
			cellViewTarget.model instanceof SbpmInterfaceSubject) &&
		linkView.model instanceof SbpmMessageExchange;
	const isSendStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmSendState ||
			cellViewTarget.model instanceof SbpmFunctionState ||
			cellViewTarget.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmSendStateTransition;
	const isReceiveStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmSendState ||
			cellViewTarget.model instanceof SbpmFunctionState ||
			cellViewTarget.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmReceiveStateTransition;
	const isFunctionStateTransitionValid =
		cellViewTarget.model.isElement() &&
		(cellViewTarget.model instanceof SbpmSendState ||
			cellViewTarget.model instanceof SbpmFunctionState ||
			cellViewTarget.model instanceof SbpmReceiveState) &&
		linkView.model instanceof SbpmFunctionStateTransition;

	return (
		valid &&
		(isProcessTransitionValid ||
			isMessageExchangeValid ||
			isSendStateTransitionValid ||
			isReceiveStateTransitionValid ||
			isFunctionStateTransitionValid)
	);
}
