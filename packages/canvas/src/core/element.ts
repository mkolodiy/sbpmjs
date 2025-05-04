import * as joint from "@joint/core";
import { CustomEvent } from "../shared/constants";
import type { SbpmElementToolsOptions } from "./element-tools";
import type {
	SbpmBaseItemOptions,
	SbpmItemAttributes,
	SbpmItemId,
	SbpmItemPosition,
	UpdateOptions,
} from "./shared/types";

type SbpmElementAttributes<TType extends string> =
	joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
		SbpmItemAttributes<TType, SbpmElementToolsOptions>;

export interface SbpmElementOptions<TType extends string = string>
	extends SbpmBaseItemOptions<TType> {
	position: SbpmItemPosition;
}

export class SbpmElement<TType extends string = string> extends joint.dia
	.Element<SbpmElementAttributes<TType>> {
	declare id: SbpmItemId;

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

	public getToolsOptions(): SbpmElementToolsOptions {
		const toolsOptions = this.prop("toolsOptions");
		if (!toolsOptions) {
			throw new Error(
				`toolsOptions not defined for element with id ${this.id} and type ${this.prop("type")} `,
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

	public update(options: UpdateOptions<SbpmElementOptions<TType>>) {
		const { label, position } = options;

		if (label) {
			this.attr("label/text", label);
		}

		if (position) {
			this.prop("position", position);
		}

		this.trigger(CustomEvent.ELEMENT_UPDATED, this);
	}

	public options(): SbpmElementOptions<TType> {
		const options: SbpmElementOptions<TType> = {
			id: String(this.id),
			type: this.prop("type"),
			label: this.attr("label/text"),
			position: this.position(),
		};
		return options;
	}
}
