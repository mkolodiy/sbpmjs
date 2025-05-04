import { SbpmModeler } from "../src";

const uuid = () => crypto.randomUUID();

const processId = uuid();
const processNetworkId = uuid();
const processModelId = uuid();
const processTransitionId = uuid();
const subjectAId = uuid();
const subjectBId = uuid();
const messageTransitionId = uuid();
const messageId = uuid();
const sendStateId = uuid();
const receiveStateId = uuid();
const functionStateId = uuid();
const sendStateTransitionId = uuid();
const receiveStateTransitionId = uuid();
const functionStateTransitionId = uuid();

const container = document.getElementById("container");
if (container) {
	const modeler = new SbpmModeler({ container });
	// modeler.addItems([
	// 	{
	// 		type: "sbpm.pnd.SbpmProcess",
	// 		id: processId,
	// 		label: "Custom process",
	// 		contains: [processNetworkId, processModelId, processTransitionId],
	// 	},
	// 	{
	// 		type: "sbpm.pnd.SbpmProcessNetwork",
	// 		id: processNetworkId,
	// 		label: "Process network",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.pnd.SbpmProcessModel",
	// 		id: processModelId,
	// 		label: "Process model",
	// 		position: {
	// 			x: 500,
	// 			y: 100,
	// 		},
	// 		role: "single",
	// 		contains: [subjectAId, subjectBId, messageTransitionId],
	// 	},
	// 	{
	// 		type: "sbpm.pnd.SbpmProcessTransition",
	// 		id: processTransitionId,
	// 		source: { id: processNetworkId },
	// 		target: { id: processModelId },
	// 		vertices: [{ x: 385, y: 206 }],
	// 	},
	// 	{
	// 		type: "sbpm.sid.SbpmSubject",
	// 		id: subjectAId,
	// 		label: "Subject A",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 		contains: [
	// 			// The order is important.
	// 			sendStateTransitionId,
	// 			sendStateId,
	// 			receiveStateId,
	// 			receiveStateTransitionId,
	// 			functionStateId,
	// 			functionStateTransitionId,
	// 		],
	// 	},
	// 	{
	// 		type: "sbpm.sid.SbpmSubject",
	// 		id: subjectBId,
	// 		label: "Subject B",
	// 		position: {
	// 			x: 500,
	// 			y: 100,
	// 		},
	// 		contains: [],
	// 	},
	// 	{
	// 		type: "sbpm.sid.SbpmMessageTransition",
	// 		id: messageTransitionId,
	// 		contains: [messageId],
	// 		label: "Message transition",
	// 		source: { id: subjectAId },
	// 		target: { id: subjectBId },
	// 		role: "unidirectional",
	// 	},
	// 	{
	// 		type: "sbpm.pnd.SbpmMessage",
	// 		id: messageId,
	// 		label: "Message",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmSendState",
	// 		id: sendStateId,
	// 		label: "Send state",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 		role: "start",
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmReceiveState",
	// 		id: receiveStateId,
	// 		label: "Receive state",
	// 		position: {
	// 			x: 600,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmFunctionState",
	// 		id: functionStateId,
	// 		label: "Function state",
	// 		position: {
	// 			x: 100,
	// 			y: 600,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmSendStateTransition",
	// 		id: sendStateTransitionId,
	// 		// message: {
	// 		// 	id: messageId,
	// 		// 	label: "Message",
	// 		// },
	// 		// subject: {
	// 		// 	id: subjectBId,
	// 		// 	label: "Subject B",
	// 		// },
	// 		source: {
	// 			id: sendStateId,
	// 		},
	// 		target: {
	// 			id: receiveStateId,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmReceiveStateTransition",
	// 		id: receiveStateTransitionId,
	// 		// message: {
	// 		// 	id: messageId,
	// 		// 	label: "Message",
	// 		// },
	// 		// subject: {
	// 		// 	id: subjectBId,
	// 		// 	label: "Subject B",
	// 		// },
	// 		source: {
	// 			id: receiveStateId,
	// 		},
	// 		target: {
	// 			id: functionStateId,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.sbd.SbpmFunctionStateTransition",
	// 		id: functionStateTransitionId,
	// 		label: "F Message",
	// 		source: { id: functionStateId },
	// 		target: { id: sendStateId },
	// 	},
	// ]);
}
