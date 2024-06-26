import * as joint from "@joint/core";
import type {
	GetUpdateOptions,
	SbpmItemAttributes,
	SbpmLink as SbpmLinkOptions,
	SbpmLinkType,
} from "../common/types";
import type { SbpmElement } from "./element";
import type {
	SbpmLinkLabelToolsOptions,
	SbpmLinkToolsOptions,
} from "./link-tools";

export const attrs = {
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
	wrapper: {
		connection: true,
		strokeWidth: 10,
		strokeLinejoin: "round",
	},
};

export const markup = [
	{
		tagName: "path",
		selector: "wrapper",
		attributes: {
			fill: "none",
			cursor: "pointer",
			stroke: "transparent",
			"stroke-linecap": "round",
		},
	},
	{
		tagName: "path",
		selector: "line",
		attributes: {
			fill: "none",
			"pointer-events": "none",
		},
	},
];

export type SbpmLinkAttributes =
	joint.dia.Link.GenericAttributes<joint.shapes.standard.LinkSelectors> &
		SbpmItemAttributes<SbpmLinkToolsOptions>;

export class SbpmLink extends joint.dia.Link<SbpmLinkAttributes> {
	type: SbpmLinkType = undefined as unknown as SbpmLinkType;

	defaults() {
		return {
			...super.defaults,
			attrs,
		};
	}

	markup = markup;

	public get toolsOptions() {
		return this.attributes.toolsOptions as SbpmLinkToolsOptions;
	}

	public set toolsOptions(newToolsOptions: SbpmLinkToolsOptions) {
		this.attributes.toolsOptions = newToolsOptions;
	}

	public get labelToolsOptions() {
		return this.attributes.labelToolsOptions as SbpmLinkLabelToolsOptions;
	}

	public hasSource() {
		return "id" in this.source();
	}

	public hasTarget() {
		return "id" in this.target();
	}

	public update(options: GetUpdateOptions<SbpmLinkOptions>) {
		const { source, target, label } = options;

		if (source) {
			this.source(handleEndpoint(source));
		}

		if (target) {
			this.target(handleEndpoint(target));
		}

		if (label && this.hasLabels()) {
			this.label(0, {
				attrs: {
					text: {
						textWrap: {
							text: label,
						},
					},
				},
			});
		}
	}

	public select() {
		this.toFront();
	}

	public deselect() {
		// Deliberately left empty
	}

	public resetVertices() {
		this.vertices([]);
	}

	public getUpdatableOptions(): GetUpdateOptions<SbpmLinkOptions> {
		const options: GetUpdateOptions<SbpmLinkOptions> = {};

		if (this.hasLabels()) {
			options.label = this.label(0).attrs?.text?.textWrap?.text;
		}

		const sourceId = String(this.source().id);
		const targetId = String(this.target().id);

		if (sourceId) {
			options.source = sourceId;
		}

		if (targetId) {
			options.target = targetId;
		}

		return options;
	}
}

export function handleEndpoint(endpoint: SbpmElement | string) {
	if (typeof endpoint === "string") {
		return {
			id: endpoint,
		};
	}

	return endpoint;
}
