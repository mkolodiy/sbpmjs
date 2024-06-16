import * as joint from "@joint/core";
import { createJointType } from "../common/utils";

export const SbpmCanvasOrigin = joint.shapes.standard.Rectangle.define(
	createJointType("sbpm.common", "Origin"),
	{
		attrs: {
			x: -20,
			y: -20,
			width: 40,
			height: 40,
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
	},
	{
		markup: [
			{
				tagName: "rect",
				selector: "verticalLine",
			},
			{
				tagName: "rect",
				selector: "horizontalLine",
			},
			{
				tagName: "text",
				selector: "text",
			},
		],
	},
);
