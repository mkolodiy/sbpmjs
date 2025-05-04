import * as joint from "@joint/core";
import { CustomEvent } from "../shared/constants";
import type { Icons } from "../shared/types";

const defaultBoundaryOptions: joint.elementTools.Boundary.Options = {
	focusOpacity: 1,
	useModelGeometry: true,
	padding: 5,
};

function defaultButtonOptions(icons: Icons): joint.elementTools.Button.Options {
	return {
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
					href: icons.touchAppIcon,
					cursor: "pointer",
				},
			},
			{
				tagName: "title",
				textContent: "New button with no action",
			},
		],
	};
}

function defaultConnectOptions(
	icons: Icons,
): joint.elementTools.Connect.Options {
	return joint.util.merge(joint.util.cloneDeep(defaultButtonOptions(icons)), {
		markup: [
			{},
			{
				tagName: "image",
				attributes: {
					href: icons.callMadeIcon,
				},
			},
			{
				tagName: "title",
				textContent: "Connect",
			},
		],
		focusOpacity: 0,
	});
}

function defaultRemoveOptions(icons: Icons): joint.elementTools.Button.Options {
	return joint.util.merge(joint.util.cloneDeep(defaultButtonOptions(icons)), {
		markup: [
			{},
			{
				tagName: "image",
				attributes: {
					href: icons.deleteIcon,
				},
			},
			{
				tagName: "title",
				textContent: "Remove",
			},
		],
	});
}

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

export type SbpmElementToolsOptions = Array<
	| SbpmElementBoundaryToolOptions
	| SbpmElementButtonToolOptions
	| SbpmElementConnectToolOptions
	| SbpmElementControlToolOptions
	| SbpmElementRemoveToolOptions
	| SbpmElementOpenToolOptions
>;

function createBoundary(
	options: joint.elementTools.Boundary.Options,
): joint.elementTools.Boundary {
	return new joint.elementTools.Boundary(
		joint.util.merge(joint.util.cloneDeep(defaultBoundaryOptions), options),
	);
}

function createButton(
	options: joint.elementTools.Button.Options,
	icons: Icons,
): joint.elementTools.Button {
	return new joint.elementTools.Button(
		joint.util.merge(
			joint.util.cloneDeep(defaultButtonOptions(icons)),
			options,
		),
	);
}

function createConnect(
	options: joint.elementTools.Connect.Options,
	icons: Icons,
): joint.elementTools.Connect {
	return new joint.elementTools.Connect(
		joint.util.merge(
			joint.util.cloneDeep(defaultConnectOptions(icons)),
			options,
		),
	);
}

function createRemove(
	options: joint.elementTools.Button.Options,
	icons: Icons,
): joint.elementTools.Remove {
	return new joint.elementTools.Remove(
		joint.util.merge(
			joint.util.cloneDeep(defaultRemoveOptions(icons)),
			options,
		),
	);
}

export function createElementTools(
	toolsOptions: SbpmElementToolsOptions,
	icons: Icons,
): joint.dia.ToolsView {
	const tools: Array<joint.dia.ToolView> = [];

	const boundaryToolOptions =
		toolsOptions.find((toolOptions) => toolOptions.type === "boundary") ??
		({} as SbpmElementBoundaryToolOptions);
	tools.push(createBoundary(boundaryToolOptions.options));

	for (const toolOptions of toolsOptions) {
		if (toolOptions.type === "button") {
			tools.push(createButton(toolOptions.options, icons));
		}

		if (toolOptions.type === "open") {
			tools.push(
				createButton(
					joint.util.merge(toolOptions.options, {
						markup: [
							{
								tagName: "rect",
							},
							{
								tagName: "image",
								attributes: {
									href: icons.openInNew,
								},
							},
							{
								tagName: "title",
								textContent: "Open",
							},
						],
						action: (
							evt: joint.dia.Event,
							elementView: joint.dia.ElementView,
						) => {
							elementView.paper?.trigger(
								CustomEvent.ELEMENT_OPEN,
								elementView,
								evt,
							);
						},
					}),
					icons,
				),
			);
		}

		if (toolOptions.type === "connect") {
			tools.push(createConnect(toolOptions.options, icons));
		}

		if (toolOptions.type === "remove") {
			tools.push(
				createRemove(
					joint.util.merge(toolOptions.options, {
						action: (
							evt: joint.dia.Event,
							elementView: joint.dia.ElementView,
						) => {
							elementView.paper?.trigger(
								CustomEvent.ELEMENT_REMOVE,
								elementView,
								evt,
							);
						},
					}),
					icons,
				),
			);
		}
	}

	const toolsView = new joint.dia.ToolsView({
		tools,
	});

	return toolsView;
}
