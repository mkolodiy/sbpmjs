import * as joint from "@joint/core";
import { callMadeIcon, deleteIcon, touchAppIcon } from "../common/icons";

const defaultBoundaryOptions: joint.elementTools.Boundary.Options = {
	focusOpacity: 1,
	useModelGeometry: true,
	padding: 5,
};

const defaultButtonOptions: joint.elementTools.Button.Options = {
	y: -5,
	markup: [
		{
			tagName: "rect",
			attributes: {
				fill: "white",
				width: "24px",
				height: "24px",
				rx: 1,
				ry: 1,
			},
		},
		{
			tagName: "image",
			attributes: {
				"xlink:href": touchAppIcon,
				cursor: "pointer",
			},
		},
		{
			tagName: "title",
			textContent: "New button with no action",
		},
	],
};

const defaultConnectOptions: joint.elementTools.Connect.Options =
	joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
		markup: [
			{},
			{
				tagName: "image",
				attributes: {
					"xlink:href": callMadeIcon,
				},
			},
			{
				tagName: "title",
				textContent: "Connect",
			},
		],
		focusOpacity: 0,
	});

const defaultRemoveOptions: joint.elementTools.Button.Options =
	joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), {
		markup: [
			{},
			{
				tagName: "image",
				attributes: {
					"xlink:href": deleteIcon,
				},
			},
			{
				tagName: "title",
				textContent: "Remove",
			},
		],
	});

export type SbpmElementBoundaryToolOptions = {
	type: "boundary";
	options: joint.elementTools.Boundary.Options;
};

export type SbpmElementButtonToolOptions = {
	type: "button";
	options: joint.elementTools.Button.Options;
};

export type SbpmElementConnectToolOptions = {
	type: "connect";
	options: joint.elementTools.Connect.Options;
};

export type SbpmElementControlToolOptions = {
	type: "control";
	options: joint.elementTools.Control.Options;
};

export type SbpmElementRemoveToolOptions = {
	type: "remove";
	options: joint.elementTools.Button.Options;
};

export type SbpmElementOpenToolOptions = {
	type: "open";
	options: joint.elementTools.Button.Options;
};

export type SbpmElementToolsOptions = (
	| SbpmElementBoundaryToolOptions
	| SbpmElementButtonToolOptions
	| SbpmElementConnectToolOptions
	| SbpmElementControlToolOptions
	| SbpmElementRemoveToolOptions
	| SbpmElementOpenToolOptions
)[];

function createBoundary(options: joint.elementTools.Boundary.Options) {
	return new joint.elementTools.Boundary(
		joint.util.merge(joint.util.cloneDeep(defaultBoundaryOptions), options),
	);
}

function createButton(options: joint.elementTools.Button.Options) {
	return new joint.elementTools.Button(
		joint.util.merge(joint.util.cloneDeep(defaultButtonOptions), options),
	);
}

function createConnect(options: joint.elementTools.Connect.Options) {
	return new joint.elementTools.Connect(
		joint.util.merge(joint.util.cloneDeep(defaultConnectOptions), options),
	);
}

function createRemove(options: joint.elementTools.Button.Options) {
	return new joint.elementTools.Remove(
		joint.util.merge(joint.util.cloneDeep(defaultRemoveOptions), options),
	);
}

export function createElementTools(toolsOptions: SbpmElementToolsOptions) {
	const tools = [];

	const boundaryToolOptions =
		toolsOptions.find((toolOptions) => toolOptions.type === "boundary") ??
		({} as SbpmElementBoundaryToolOptions);
	tools.push(createBoundary(boundaryToolOptions.options));

	for (const toolOptions of toolsOptions) {
		if (toolOptions.type === "button" || toolOptions.type === "open") {
			tools.push(createButton(toolOptions.options));
		}

		if (toolOptions.type === "connect") {
			tools.push(createConnect(toolOptions.options));
		}

		if (toolOptions.type === "remove") {
			tools.push(createRemove(toolOptions.options));
		}
	}

	const toolsView = new joint.dia.ToolsView({
		tools,
	});

	return toolsView;
}
