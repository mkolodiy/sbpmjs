import { SbpmModeler } from "@sbpmjs/modeler";
import "./style.css";

const container = document.getElementById("container");

if (container) {
  const modeler = new SbpmModeler({
		container,
	});

	modeler.addSbpmSubject({
		label: "Subject",
		position: { x: 100, y: 100 },
	});
}
