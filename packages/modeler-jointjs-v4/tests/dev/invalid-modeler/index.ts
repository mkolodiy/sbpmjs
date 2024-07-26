import { SbpmModeler } from "../../../src";

declare global {
	interface Window {
		SbpmModeler: SbpmModeler;
	}
}

const modeler = new SbpmModeler({
	// @ts-ignore
	container: undefined,
});
