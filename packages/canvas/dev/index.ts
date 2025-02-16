import { SbpmCanvas } from "../src";

const container = document.getElementById("container");
if (container) {
	const canvas = new SbpmCanvas({
		container,
		onSelectElement: () => {
			console.log("select");
		},
		onDeleteElement: () => {
			console.log("delete");
		},
		onDeleteLink: () => {
			console.log("delete");
		},
	});

	const id = crypto.randomUUID();
	canvas.addItem({
		type: "sbpm.pnd.SbpmProcessNetwork",
		id: id,
		label: "Test 123",
		position: {
			x: 100,
			y: 100,
		},
	});

	const id1 = crypto.randomUUID();
	canvas.addItem({
		type: "sbpm.pnd.SbpmProcessModel",
		id: id1,
		label: "Process model",
		position: {
			x: 500,
			y: 100,
		},
	});

	canvas.addItem({
		type: "sbpm.pnd.SbpmProcessTransition",
		id: crypto.randomUUID(),
		source: {
			id: id,
		},
		target: { id: id1 },
	});

	// setTimeout(() => {
	// 	canvas.cleanup();
	// }, 10_000);

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
