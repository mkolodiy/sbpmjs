import * as joint from "@joint/core";
import type { UpdateOptions, SbpmItemAttributes } from "../types/internal";
import type { SbpmLinkToolsOptions } from "./link-tools";
import type { SbpmElement } from "./element";
import type { SbpmItemOptions } from "../types/external";

type SbpmLinkAttributes<TType extends string = string> =
	joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
		SbpmItemAttributes<TType, SbpmLinkToolsOptions>;

export interface SbpmLinkOptions extends SbpmItemOptions {
	source: SbpmElement | { id: string };
	target?: SbpmElement | { id: string };
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

	public get toolsOptions(): SbpmLinkToolsOptions {
		const toolsOptions = this.attributes.data?.toolsOptions;
		if (!toolsOptions) {
			throw new Error(
				`toolsOptions not defined for link with id ${this.id} and type ${this.attributes.type} `,
			);
		}
		return toolsOptions;
	}

	public set toolsOptions(toolsOptions: SbpmLinkToolsOptions) {
		this.prop("data/toolsOptions", toolsOptions);
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

	public update(options: UpdateOptions<SbpmLinkOptions>): void {
		const { source, target, label } = options;

		if (source) {
			this.source(source);
		}

		if (target) {
			this.target(target);
		}

		if (label && this.hasLabels()) {
			this.label(0, {
				attrs: {
					text: {
						text: label,
					},
				},
			});
		}
	}
}
