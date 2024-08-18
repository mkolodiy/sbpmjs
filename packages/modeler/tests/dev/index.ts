import { SbpmModeler } from "../../dist/index.js";

declare global {
	interface Window {
		SbpmModeler: SbpmModeler;
	}
}

const container = document.getElementById("container");
if (container) {
	const modeler = new SbpmModeler({
		container,
	});
	window.SbpmModeler = modeler;
}
