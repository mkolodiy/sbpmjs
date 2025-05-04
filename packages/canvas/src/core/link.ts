import * as joint from "@joint/core";
import { CustomEvent } from "../shared/constants";
import type { SbpmLinkToolsOptions } from "./link-tools";
import type {
	SbpmBaseItemOptions,
	SbpmItemAttributes,
	SbpmItemId,
	SbpmItemPosition,
	UpdateOptions,
} from "./shared/types";

type SbpmLinkAttributes<TType extends string> =
	joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
		SbpmItemAttributes<TType, SbpmLinkToolsOptions>;

export interface SbpmLinkOptions<TType extends string = string>
	extends SbpmBaseItemOptions<TType> {
	fromElement: SbpmItemId;
	toElement: SbpmItemId;
	vertices?: Array<SbpmItemPosition>;
}

export class SbpmLink<TType extends string = string> extends joint.dia.Link<
	SbpmLinkAttributes<TType>
> {
	declare id: SbpmItemId;

	override preinitialize(): void {
		this.markup = joint.util
			.svg`<path @selector="wrapper" fill="none" cursor="pointer" stroke="transparent" stroke-linecap="round"/><path @selector="line" fill="none" pointer-events="none"/>`;
	}

	override defaults(): Partial<SbpmLinkAttributes<TType>> {
		return {
			...super.defaults,
			attrs: {
				wrapper: {
					connection: true,
					strokeWidth: 10,
					strokeLinejoin: "round",
				},
				line: {
					connection: true,
					stroke: "#333333",
					strokeWidth: 2,
					strokeLinejoin: "round",
					targetMarker: {
						type: "path",
						d: "M 10 -5 0 0 10 5 z",
					},
				},
			},
		};
	}

	public getToolsOptions(): SbpmLinkToolsOptions {
		const toolsOptions = this.prop("toolsOptions");
		if (!toolsOptions) {
			throw new Error(
				`toolsOptions not defined for link with id ${this.id} and type ${this.attributes.type} `,
			);
		}
		return toolsOptions;
	}

	public setToolsOptions(toolsOptions: SbpmLinkToolsOptions) {
		this.removeProp("toolsOptions");
		this.prop("toolsOptions", toolsOptions);
	}

	public select(): void {
		this.toFront();
	}

	public deselect(): void {
		// Deliberately left empty
	}

	public resetVertices() {
		this.vertices([]);
	}

	public hasSource(): boolean {
		return "id" in this.source();
	}

	public hasTarget(): boolean {
		return "id" in this.target();
	}

	public update(options: UpdateOptions<SbpmLinkOptions<TType>>): void {
		const { fromElement, toElement, vertices } = options;

		if (fromElement) {
			this.source(fromElement);
		}

		if (toElement) {
			this.target(toElement);
		}

		if (vertices) {
			this.vertices(vertices);
		}

		this.trigger(CustomEvent.LINK_UPDATED, this);
	}

	public options(): SbpmLinkOptions<TType> {
		const options: SbpmLinkOptions<TType> = {
			id: String(this.id),
			type: this.prop("type"),
			label: this.prop("label"),
			fromElement: "",
			toElement: "",
		};
		const sourceId = this.source()?.id;
		if (sourceId) {
			options.fromElement = String(sourceId);
		}
		const targetId = this.target()?.id;
		if (targetId) {
			options.toElement = String(targetId);
		}
		const vertices = this.vertices();
		if (vertices.length > 0) {
			options.vertices = vertices;
		}
		return options;
	}
}
