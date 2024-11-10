import { SbpmCanvas } from "../src";

const container = document.getElementById("container");
if (container) {
	const canvas = new SbpmCanvas({
		container,
		onDeleteElement: () => {
			console.log("delete");
		},
		onDeleteLink: () => {
			console.log("delete");
		},
	});

	canvas.addSbpmProcessNetwork({
		label: "Process network",
		position: {
			x: 300,
			y: 100,
		},
	});

	canvas.addSbpmProcessModel({
		type: "sbpm.pnd.SbpmProcessModel",
		label: "Process Model",
		position: {
			x: 600,
			y: 100,
		},
	});

	canvas.addSbpmProcessModel({
		type: "sbpm.pnd.SbpmProcessModel",
		label: "Process Model",
		position: {
			x: 600,
			y: 300,
		},
	});

	// const sbpmSubject1 = modeler.addSbpmSubject({
	// 	id: "test-id",
	// 	label: "BLABLA",
	// 	position: { x: 100, y: 100 },
	// 	customData: {
	// 		test: ["a"],
	// 	},
	// });
	// const sbpmSubject2 = modeler.addSbpmSubject({
	// 	id: "element-2",
	// 	label: "test",
	// 	position: { x: 500, y: 300 },
	// });
	// const sbpmMessageTransition = modeler.createSbpmMessageTransition({
	// 	label: "TEst message transition",
	// 	source: sbpmSubject1,
	// 	target: sbpmSubject2,
	// });
	// modeler.canvas.addLink(sbpmMessageTransition);

	// modeler.addSbpmSendState({
	// 	label: "Test send state",
	// 	position: {
	// 		x: 100,
	// 		y: 500,
	// 	},
	// });

	// modeler.addSbpmReceiveState({
	// 	label: "Test receive state",
	// 	position: {
	// 		x: 300,
	// 		y: 500,
	// 	},
	// });

	// modeler.addSbpmFunctionState({
	// 	label: "Test Function state",
	// 	position: {
	// 		x: 600,
	// 		y: 500,
	// 	},
	// });

	// modeler.addSbpmItems([
	// 	{
	// 		type: 'sbpm.pnd.SbpmProcessTransition',

	// 	}
	// ])

	// modeler.addSbpmItems([
	// 	{

	// 	}
	// ])

	// setTimeout(() => {
	// 	console.log(modeler.canvas.getLinks());
	// }, 4000);

	document.getElementById("clear-canvas")?.addEventListener("click", () => {
		canvas.clear();
	});

	document.getElementById("reset-canvas")?.addEventListener("click", () => {
		canvas.reset();
	});

	document.getElementById("restore-view")?.addEventListener("click", () => {});

	document.getElementById("zoom-in")?.addEventListener("click", () => {
		canvas.zoomIn();
	});

	document.getElementById("zoom-out")?.addEventListener("click", () => {
		canvas.zoomOut();
	});
}
