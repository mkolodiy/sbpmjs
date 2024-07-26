import { SbpmCanvas } from "./canvas";
import type { SbpmModelerOptions } from "./canvas";
import type {
	SbpmElementItem,
	SbpmElementType,
	SbpmItemGroup,
	SbpmItemType,
	SbpmLinkItem,
	SbpmLinkType,
} from "./common/types";
import { isSbpmLinkType } from "./common/utils";
import type { SbpmElement } from "./core/element";
import type { SbpmLink } from "./core/link";
import {
	elementTypeToElementClassMapping,
	linkTypeToLinkClassMapping,
} from "./sbpm/mappings";
import type {
	GetSbpmElementUpdateOptions,
	GetSbpmLinkUpdateOptions,
} from "./sbpm/types";

export class SbpmModeler {
	#canvas: SbpmCanvas;
	#options: SbpmModelerOptions;

	constructor(options: SbpmModelerOptions) {
		if (!options?.container) {
			throw new Error("Container is not provided");
		}

		this.#canvas = new SbpmCanvas(options);
		this.#options = options;
	}

	/**
	 * Get the canvas instance.
	 *
	 * @returns The canvas instance.
	 */
	public get canvas() {
		return this.#canvas;
	}

	/**
	 * Create a new element.
	 *
	 * @param item The item options.
	 * @returns The element instance.
	 *
	 * @example
	 * Here is an example for a ProcessNetwork element:
	 * ```
	 * const element = modeler.createSbpmElement({
	 *   type: 'ProcessNetwork',
	 *   properties: {
	 *     label: 'Test process network',
	 *     position: {
	 *       x: 100,
	 *       y: 100,
	 *     },
	 *   },
	 * });
	 * ```
	 */
	public createSbpmElement<Type extends SbpmElementType = SbpmElementType>({
		type,
		properties,
	}: SbpmElementItem<Type>) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new elementTypeToElementClassMapping[type](
			properties,
			this.#options,
		) as ElementTypeToElementClassMapping[Type];
	}

	/**
	 * Create a new link.
	 *
	 * @param item The link options.
	 * @returns The link instance.
	 *
	 * @example
	 * Here is an example for a ProcessTransition link:
	 * ```
	 * const link = modeler.createSbpmLink({
	 *   type: 'ProcessTransition',
	 *   properties: {
	 *     source: 'processNetwork',
	 *     target: 'processModel',
	 *   },
	 * });
	 * ```
	 */
	public createSbpmLink<Type extends SbpmLinkType = SbpmLinkType>({
		type,
		properties,
	}: SbpmLinkItem<Type>) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new linkTypeToLinkClassMapping[type](
			properties,
			this.#options,
		) as LinkTypeToLinkClassMapping[Type];
	}

	/**
	 * Update an element.
	 *
	 * @remark
	 * The options will be automatically inferred based on the passed element.
	 *
	 * @param element The element to update.
	 * @param options The options for the element.
	 *
	 * @example
	 * Here is an example for a ProcessNetwork element:
	 * ```
	 * const element = modeler.createSbpmElement({
	 *   type: 'ProcessNetwork',
	 *   properties: {
	 *     label: 'Test process network',
	 *     position: {
	 *       x: 100,
	 *       y: 100,
	 *     },
	 *   },
	 * });
	 *
	 * modeler.updateSbpmElement(element, {
	 *  label: 'New label'
	 * });
	 * ```
	 */
	public updateSbpmElement<T extends SbpmElement>(
		element: T,
		options: GetSbpmElementUpdateOptions<T>,
	) {
		element.update(options);
	}

	/**
	 * Update a link.
	 *
	 * @remark
	 * The options will be automatically inferred based on the passed link.
	 *
	 * @param link The link to update.
	 * @param options The options for the link.
	 *
	 * @example
	 * Here is an example for a ProcessNetwork element:
	 * ```
	 * const link = modeler.createSbpmLink({
	 *   type: 'ProcessTransition',
	 *   properties: {
	 *     source: 'processNetwork',
	 *     target: 'processModel',
	 *   },
	 * });
	 *
	 * modeler.updateSbpmLink(link, {
	 *  source: anotherProcessNetwork,
	 * });
	 * ```
	 */
	public updateSbpmLink<T extends SbpmLink>(
		link: T,
		options: GetSbpmLinkUpdateOptions<T>,
	) {
		link.update(options);
	}

	/**
	 * Create a new element and add it to the canvas.
	 *
	 * @param item The item options.
	 * @returns The element instance.
	 *
	 * @example
	 * Here is an example for a ProcessNetwork element:
	 * ```
	 * const element = modeler.addSbpmElement({
	 *   type: 'ProcessNetwork',
	 *   properties: {
	 *     label: 'Test process network',
	 *     position: {
	 *       x: 100,
	 *       y: 100,
	 *     },
	 *   },
	 * });
	 * ```
	 */
	public addSbpmElement<Type extends SbpmElementType = SbpmElementType>(
		item: SbpmElementItem<Type>,
	) {
		const element = this.createSbpmElement(item);
		element.addTo(this.#canvas.graph);
		return element;
	}

	/**
	 * Create a new link and add it to the canvas.
	 *
	 * @param item The link options.
	 * @returns The link instance.
	 *
	 * @example
	 * Here is an example for a ProcessTransition link:
	 * ```
	 * const link = modeler.addSbpmLink({
	 *   type: 'ProcessTransition',
	 *   properties: {
	 *     source: 'processNetwork',
	 *     target: 'processModel',
	 *   },
	 * });
	 * ```
	 */
	public addSbpmLink<Type extends SbpmLinkType = SbpmLinkType>(
		item: SbpmLinkItem<Type>,
	) {
		const link = this.createSbpmLink(item);
		link.addTo(this.#canvas.graph);
		return link;
	}

	/**
	 * Creates elements and links and adds them to the canvas.
	 *
	 * @param view A collection of items (elements and links).
	 */
	public restoreView<Type extends SbpmItemType = SbpmItemType>(
		view: SbpmItemGroup<Type>,
	) {
		this.#canvas.clear();
		const elements = view.filter(({ type }) => !isSbpmLinkType(type));
		const links = view.filter(({ type }) => isSbpmLinkType(type));
		for (const element of elements) {
			this.addSbpmElement(element as SbpmElementItem);
		}
		for (const link of links) {
			this.addSbpmLink(link as SbpmLinkItem);
		}
	}
}
