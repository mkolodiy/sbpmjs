import * as joint from "@joint/core";
import type { SbpmItemAttributes } from "../types/internal";

type SbpmCanvasOriginAttributes =
	joint.dia.Element.GenericAttributes<joint.shapes.standard.ImageSelectors> &
		SbpmItemAttributes<"sbpm.common.SbpmCanvasOrigin">;

export class SbpmCanvasOrigin extends joint.dia
	.Element<SbpmCanvasOriginAttributes> {
	override preinitialize(): void {
		this.markup = joint.util.svg`
			<rect @selector="verticalLine"/>
			<rect @selector="horizontalLine"/>
			<text @selector="text"/>
		`;
	}

	override defaults(): Partial<SbpmCanvasOriginAttributes> {
		return {
			...super.defaults,
			type: "sbpm.common.SbpmCanvasOrigin",
			position: {
				x: -20,
				y: -20,
			},
			size: { width: 40, height: 40 },
			attrs: {
				verticalLine: {
					xAlignment: "middle",
					yAlignment: "middle",
					width: 3,
					height: 40,
					fill: "#000",
					opacity: 0.25,
					pointerEvents: "none",
				},
				horizontalLine: {
					xAlignment: "middle",
					yAlignment: "middle",
					width: 40,
					height: 3,
					fill: "#000",
					opacity: 0.25,
					pointerEvents: "none",
				},
				text: {
					textVerticalAnchor: "middle",
					textAnchor: "middle",
					refX: "50%",
					refY: "50%",
					fill: "#000",
					opacity: 0.25,
					text: "(0,0)",
					pointerEvents: "none",
				},
			},
		};
	}
}
