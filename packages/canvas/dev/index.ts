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

	canvas.addItem({
		type: "sbpm.pnd.SbpmProcessNetwork",
		id: "test-123",
		label: "Test 123",
		position: {
			x: 100,
			y: 100,
		},
	});

	setTimeout(() => {
		canvas.cleanup();
	}, 10_000);

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
