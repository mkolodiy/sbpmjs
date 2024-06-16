import * as joint from "jointjs";
import type { SbpmModelerOptions } from "../canvas";
import { blueDotIcon, redDotIcon } from "../common/icons";
import type {
	GetUpdateOptions,
	SbpmFunctionStateType,
	SbpmReceiveStateType,
	SbpmSendStateType,
	SbpmState as SbpmStateOptions,
} from "../common/types";
import { createJointType } from "../common/utils";
import { SbpmElement, type SbpmElementAttributes } from "../core/element";
import type { SbpmElementToolsOptions } from "../core/element-tools";
import { addActionsToElementToolsOptions } from "../core/element-view";

export class SbpmState<
	T extends SbpmSendStateType | SbpmReceiveStateType | SbpmFunctionStateType =
		| SbpmSendStateType
		| SbpmReceiveStateType
		| SbpmFunctionStateType,
> extends SbpmElement {
	type: T = undefined as unknown as T;

	constructor(
		type: T,
		jointOptions: joint.shapes.standard.ImageAttributes,
		toolsOptions: SbpmElementToolsOptions,
		options: SbpmStateOptions,
		modelerOptions: SbpmModelerOptions,
	) {
		const { label, ...restOptions } = options;

		const attributes = joint.util.merge(joint.util.cloneDeep(jointOptions), {
			attrs: {
				label: {
					textWrap: {
						text: label,
					},
				},
				stateModifier: {
					...getStateModifierOptions(options),
				},
			},
			toolsOptions: addActionsToElementToolsOptions(
				joint.util.cloneDeep(toolsOptions),
				modelerOptions,
			),
			type: createJointType("sbpm.pnd", type),
			...restOptions,
		}) as SbpmElementAttributes;

		super(attributes);

		this.type = type;
	}

	public update(options: GetUpdateOptions<SbpmStateOptions>) {
		const { role = "none" } = options;

		if (role !== "none") {
			this.attr("stateModifier/opacity", 0.5);
		} else {
			this.attr("stateModifier/opacity", 0);
		}

		if (role === "start") {
			this.attr("stateModifier/xlinkHref", blueDotIcon);
		}

		if (role === "end") {
			this.attr("stateModifier/xlinkHref", redDotIcon);
		}

		super.update(options);
	}

	public getUpdatableOptions(): GetUpdateOptions<SbpmStateOptions> {
		const options =
			super.getUpdatableOptions() as GetUpdateOptions<SbpmStateOptions>;
		options.role = "none";

		if (this.attr("stateModifier/xlinkHref") === blueDotIcon) {
			options.role = "start";
		}

		if (this.attr("stateModifier/xlinkHref") === redDotIcon) {
			options.role = "end";
		}

		return options;
	}
}

function getStateModifierOptions(options: SbpmStateOptions) {
	const { role = "none" } = options;

	if (role !== "none") {
		return {
			xlinkHref: role === "start" ? blueDotIcon : redDotIcon,
			opacity: "0.5",
		};
	}

	return {
		opacity: "0",
	};
}
