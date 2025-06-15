import { SbpmModeler } from "../src";

const uuid = () => crypto.randomUUID();

const processId = uuid();
const processNetworkId = uuid();
const processModelId = uuid();
const standardLayerId = uuid();
const processNetworkTransitionId = uuid();
const subjectAId = uuid();
const behaviorAId = uuid();
const subjectBId = uuid();
const behaviorBId = uuid();
const messageTransitionId = uuid();
const messageTransitionId2 = uuid();
const messageId = uuid();
const messageId2 = uuid();
const sendStateId = uuid();
const receiveStateId = uuid();
const functionStateId = uuid();
const sendStateTransitionId = uuid();
const receiveStateTransitionId = uuid();
const functionStateTransitionId = uuid();

const container = document.getElementById("container");
if (container) {
	const modeler = new SbpmModeler({ container });
	modeler.addItems([
		{
			type: "sbpm.Process",
			id: processId,
			label: "Custom process",
			contains: [processNetworkId, processModelId, processNetworkTransitionId],
		},
		{
			type: "sbpm.ProcessNetwork",
			id: processNetworkId,
			label: "Process network",
			position: {
				x: 100,
				y: 100,
			},
		},
		{
			type: "sbpm.ProcessModel",
			id: processModelId,
			label: "Process model",
			position: {
				x: 500,
				y: 100,
			},
			contains: [standardLayerId],
		},
		{
			type: "sbpm.StandardLayer",
			id: standardLayerId,
			label: "Process model",
			position: {
				x: 500,
				y: 100,
			},
			startSubject: subjectAId,
			contains: [
				subjectAId,
				subjectBId,
				messageTransitionId,
				messageTransitionId2,
			],
		},
		{
			type: "sbpm.ProcessNetworkTransition",
			id: processNetworkTransitionId,
			fromElement: processNetworkId,
			toElement: processModelId,
			label: "Process network transition",
			vertices: [{ x: 385, y: 206 }],
		},
		{
			type: "sbpm.StandardSubject",
			id: subjectAId,
			label: "Subject A",
			position: {
				x: 100,
				y: 100,
			},
			contains: [behaviorAId],
		},
		{
			type: "sbpm.StandardBehavior",
			id: behaviorAId,
			label: "Behavior A",
			position: {
				x: 100,
				y: 200,
			},
			startState: sendStateId,
			endState: functionStateId,
			contains: [
				// The order is important.
				sendStateTransitionId,
				sendStateId,
				receiveStateId,
				receiveStateTransitionId,
				functionStateId,
				functionStateTransitionId,
			],
		},
		{
			type: "sbpm.StandardSubject",
			id: subjectBId,
			label: "Subject B",
			position: {
				x: 500,
				y: 100,
			},
			contains: [],
		},
		{
			type: "sbpm.MessageExchange",
			id: messageTransitionId,
			contains: [messageId],
			label: "Message transition",
			fromElement: subjectAId,
			toElement: subjectBId,
		},
		{
			type: "sbpm.MessageSpecification",
			id: messageId,
			label: "Message",
			position: {
				x: 100,
				y: 100,
			},
		},
		{
			type: "sbpm.MessageExchange",
			id: messageTransitionId2,
			contains: [messageId2],
			label: "Message transition 2",
			fromElement: subjectBId,
			toElement: subjectAId,
			vertices: [{ x: 200, y: 0 }],
		},
		{
			type: "sbpm.MessageSpecification",
			id: messageId2,
			label: "test1 Message",
			position: {
				x: 100,
				y: 100,
			},
		},
		{
			type: "sbpm.SendState",
			id: sendStateId,
			label: "Send state",
			position: {
				x: 100,
				y: 100,
			},
			role: "start",
		},
		{
			type: "sbpm.ReceiveState",
			id: receiveStateId,
			label: "Receive state",
			position: {
				x: 600,
				y: 100,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: functionStateId,
			label: "Function state",
			position: {
				x: 100,
				y: 600,
			},
		},
		{
			type: "sbpm.SendStateTransition",
			id: sendStateTransitionId,
			// message: {
			// 	id: messageId,
			// 	label: "Message",
			// },
			// subject: {
			// 	id: subjectBId,
			// 	label: "Subject B",
			// },
			fromElement: sendStateId,
			toElement: receiveStateId,
			label: "S Message",
			message: undefined,
			receiverSubject: undefined,
		},
		{
			type: "sbpm.ReceiveStateTransition",
			id: receiveStateTransitionId,
			// message: {
			// 	id: messageId,
			// 	label: "Message",
			// },
			// subject: {
			// 	id: subjectBId,
			// 	label: "Subject B",
			// },
			fromElement: receiveStateId,
			toElement: functionStateId,
			label: "R Message",
			message: undefined,
			senderSubject: undefined,
		},
		{
			type: "sbpm.FunctionStateTransition",
			id: functionStateTransitionId,
			label: "F Message",
			fromElement: functionStateId,
			toElement: sendStateId,
		},
	]);
}
