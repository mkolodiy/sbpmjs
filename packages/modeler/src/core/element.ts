import * as joint from "@joint/core";
import { CustomEvent } from "../common/constants.js";
import type {
	GetUpdateOptions,
	SbpmItemOptions,
	SbpmItemAttributes,
} from "../types/internal.js";
import type { SbpmElementToolsOptions } from "./element-tools.js";

type SbpmElementAttributes<TType extends string = string> =
	joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
		SbpmItemAttributes<TType, SbpmElementToolsOptions>;

export interface SbpmElementOptions extends SbpmItemOptions {
	position: joint.dia.Point;
}

export class SbpmElement<TType extends string = string> extends joint.dia
	.Element<SbpmElementAttributes<TType>> {
	override preinitialize(): void {
		this.markup = joint.util
			.svg`<image @selector="image"/><text @selector="label"/>`;
	}

	override defaults(): Partial<SbpmElementAttributes<TType>> {
		return {
			...super.defaults,
			attrs: {
				image: {
					refWidth: "100%",
					refHeight: "100%",
				},
				label: {
					textVerticalAnchor: "top",
					textAnchor: "middle",
					refX: "50%",
					refY: "100%",
					refY2: 10,
					fontSize: 14,
					fill: "#333333",
				},
			},
		};
	}

	public get toolsOptions(): SbpmElementToolsOptions {
		const toolsOptions = this.attributes.data?.toolsOptions;
		if (!toolsOptions) {
			throw new Error(
				`toolsOptions not defined for element with id ${this.id} and type ${this.attributes.type} `,
			);
		}
		return toolsOptions;
	}

	public select(): void {
		this.attr("image/cursor", "move");
		this.toFront();
	}

	public deselect(): void {
		this.attr("image/cursor", "pointer");
	}

	protected update(options: GetUpdateOptions<SbpmElementOptions>) {
		const { label, position } = options;

		if (label) {
			this.attr("label/textWrap/text", label);
		}

		if (position) {
			this.prop("position", position);
		}

		this.trigger(CustomEvent.ELEMENT_UPDATED, this);
	}
}
