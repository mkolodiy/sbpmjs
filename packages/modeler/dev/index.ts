import { SbpmModeler } from "../src";

const container = document.getElementById("container");
if (container) {
	const modeler = new SbpmModeler({
		container,
	});

	const sbpmSubject = modeler.addSbpmSubject({
		id: "test-id",
		label: "BLABLA",
		position: { x: 100, y: 100 },
	});
	modeler.addSbpmSubject({
		id: "element-2",
		label: "test",
		position: { x: 500, y: 300 },
	});

	console.log(sbpmSubject);

	// setTimeout(() => {
	//     sbpmSubject.update({
	//         position: {
	//             x: 200,
	//             y: 200
	//         }
	//     })
	// }, 2000)
}
