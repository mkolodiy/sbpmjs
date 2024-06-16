import * as joint from "jointjs";
import type { SbpmModelerOptions } from "../canvas";
import { CustomEvent } from "../common/constants";
import type {
	GetUpdateOptions,
	SbpmElement as SbpmElementOptions,
	SbpmElementType,
	SbpmItemAttributes,
} from "../common/types";
import type { SbpmElementToolsOptions } from "./element-tools";

const attrs = {
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
};

const markup = [
	{
		tagName: "image",
		selector: "image",
	},
	{
		tagName: "text",
		selector: "label",
	},
];

export type SbpmElementAttributes =
	joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
		SbpmItemAttributes<SbpmElementToolsOptions>;

export class SbpmElement extends joint.dia.Element<SbpmElementAttributes> {
	type: SbpmElementType = undefined as unknown as SbpmElementType;
	modelerOptions: SbpmModelerOptions =
		undefined as unknown as SbpmModelerOptions;

	defaults() {
		return {
			...super.defaults,
			attrs,
		};
	}

	markup = markup;

	public get toolsOptions() {
		return this.attributes.toolsOptions as SbpmElementToolsOptions;
	}

	public update(options: GetUpdateOptions<SbpmElementOptions>) {
		const { label, position } = options;

		if (label) {
			this.attr("label/textWrap/text", label);
		}

		if (position) {
			this.prop("position", position);
		}

		this.trigger(CustomEvent.ELEMENT_UPDATED, this);
	}

	public select() {
		this.attr("image/cursor", "move");
		this.toFront();
	}

	public deselect() {
		this.attr("image/cursor", "pointer");
	}

	public getUpdatableOptions(): GetUpdateOptions<SbpmElementOptions> {
		return {
			label: this.attr("label/textWrap/text"),
			position: this.position(),
		};
	}
}
