import * as joint from "@joint/core";
import { CustomEvent } from "../shared/constants";
import type { SbpmLinkToolsOptions } from "./link-tools";
import type {
	SbpmItemAttributes,
	SbpmItemId,
	SbpmItemOptions,
	UpdateOptions,
} from "./shared/types";

type SbpmLinkAttributes<TType extends string> =
	joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
		SbpmItemAttributes<TType, SbpmLinkToolsOptions>;

export interface SbpmLinkOptions<TType extends string>
	extends SbpmItemOptions<TType> {
	source: { id: SbpmItemId };
	target: { id: SbpmItemId };
	vertices?: Array<joint.dia.Link.Vertex>;
}

export class SbpmLink<TType extends string = string> extends joint.dia.Link<
	SbpmLinkAttributes<TType>
> {
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
		const { source, target, vertices } = options;

		if (source) {
			this.source(source);
		}

		if (target) {
			this.target(target);
		}

		if (vertices) {
			this.vertices(vertices);
		}

		this.trigger(CustomEvent.LINK_UPDATED, this);
	}

	public options(): SbpmLinkOptions<TType> {
		const sourceId = this.source()?.id ?? "";
		const targetId = this.target()?.id ?? "";
		const options: SbpmLinkOptions<TType> = {
			id: this.id,
			type: this.prop("type"),
			source: {
				id: sourceId,
			},
			target: {
				id: targetId,
			},
			vertices: this.vertices(),
		};
		const customData = this.prop("customData");
		if (customData) {
			options.customData = customData;
		}
		return options;
	}
}
