import { SbpmModeler } from "../src";

const container = document.getElementById("container");
if (container) {
	const modeler = new SbpmModeler({
		container,
	});

	const sbpmSubject1 = modeler.addSbpmSubject({
		id: "test-id",
		label: "BLABLA",
		position: { x: 100, y: 100 },
		customData: {
			test: ["a"],
		},
	});
	const sbpmSubject2 = modeler.addSbpmSubject({
		id: "element-2",
		label: "test",
		position: { x: 500, y: 300 },
	});
	const sbpmMessageTransition = modeler.createSbpmMessageTransition({
		label: "TEst message transition",
		source: sbpmSubject1,
		target: sbpmSubject2,
	});
	modeler.canvas.addLink(sbpmMessageTransition);

	console.log(sbpmMessageTransition);

	// setTimeout(() => {
	// 	console.log(modeler.canvas.getLinks());
	// }, 4000);
}
