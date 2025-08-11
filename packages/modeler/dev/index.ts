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
	// modeler.addItems([
	// 	{
	// 		type: "sbpm.Process",
	// 		id: processId,
	// 		label: "Custom process",
	// 		contains: [processNetworkId, processModelId, processNetworkTransitionId],
	// 	},
	// 	{
	// 		type: "sbpm.ProcessNetwork",
	// 		id: processNetworkId,
	// 		label: "Process network",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.ProcessModel",
	// 		id: processModelId,
	// 		label: "Process model",
	// 		position: {
	// 			x: 500,
	// 			y: 100,
	// 		},
	// 		contains: [standardLayerId],
	// 	},
	// 	{
	// 		type: "sbpm.StandardLayer",
	// 		id: standardLayerId,
	// 		label: "Process model",
	// 		position: {
	// 			x: 500,
	// 			y: 100,
	// 		},
	// 		startSubject: subjectAId,
	// 		contains: [
	// 			subjectAId,
	// 			subjectBId,
	// 			messageTransitionId,
	// 			messageTransitionId2,
	// 		],
	// 	},
	// 	{
	// 		type: "sbpm.ProcessNetworkTransition",
	// 		id: processNetworkTransitionId,
	// 		fromElement: processNetworkId,
	// 		toElement: processModelId,
	// 		label: "Process network transition",
	// 		vertices: [{ x: 385, y: 206 }],
	// 	},
	// 	{
	// 		type: "sbpm.StandardSubject",
	// 		id: subjectAId,
	// 		label: "Subject A",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 		contains: [behaviorAId],
	// 	},
	// 	{
	// 		type: "sbpm.StandardBehavior",
	// 		id: behaviorAId,
	// 		label: "Behavior A",
	// 		position: {
	// 			x: 100,
	// 			y: 200,
	// 		},
	// 		startState: sendStateId,
	// 		endState: functionStateId,
	// 		contains: [
	// 			The order is important.
	// 			sendStateTransitionId,
	// 			sendStateId,
	// 			receiveStateId,
	// 			receiveStateTransitionId,
	// 			functionStateId,
	// 			functionStateTransitionId,
	// 		],
	// 	},
	// 	{
	// 		type: "sbpm.StandardSubject",
	// 		id: subjectBId,
	// 		label: "Subject B",
	// 		position: {
	// 			x: 500,
	// 			y: 100,
	// 		},
	// 		contains: [],
	// 	},
	// 	{
	// 		type: "sbpm.MessageExchange",
	// 		id: messageTransitionId,
	// 		contains: [messageId],
	// 		label: "Message transition",
	// 		fromElement: subjectAId,
	// 		toElement: subjectBId,
	// 	},
	// 	{
	// 		type: "sbpm.MessageSpecification",
	// 		id: messageId,
	// 		label: "Message",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.MessageExchange",
	// 		id: messageTransitionId2,
	// 		contains: [messageId2],
	// 		label: "Message transition 2",
	// 		fromElement: subjectBId,
	// 		toElement: subjectAId,
	// 		vertices: [{ x: 200, y: 0 }],
	// 	},
	// 	{
	// 		type: "sbpm.MessageSpecification",
	// 		id: messageId2,
	// 		label: "test1 Message",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.SendState",
	// 		id: sendStateId,
	// 		label: "Send state",
	// 		position: {
	// 			x: 100,
	// 			y: 100,
	// 		},
	// 		role: "start",
	// 	},
	// 	{
	// 		type: "sbpm.ReceiveState",
	// 		id: receiveStateId,
	// 		label: "Receive state",
	// 		position: {
	// 			x: 600,
	// 			y: 100,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.FunctionState",
	// 		id: functionStateId,
	// 		label: "Function state",
	// 		position: {
	// 			x: 100,
	// 			y: 600,
	// 		},
	// 	},
	// 	{
	// 		type: "sbpm.SendStateTransition",
	// 		id: sendStateTransitionId,
	// 		message: {
	// 			id: messageId,
	// 			label: "Message",
	// 		},
	// 		subject: {
	// 			id: subjectBId,
	// 			label: "Subject B",
	// 		},
	// 		fromElement: sendStateId,
	// 		toElement: receiveStateId,
	// 		label: "S Message",
	// 		message: undefined,
	// 		receiverSubject: undefined,
	// 	},
	// 	{
	// 		type: "sbpm.ReceiveStateTransition",
	// 		id: receiveStateTransitionId,
	// 		message: {
	// 			id: messageId,
	// 			label: "Message",
	// 		},
	// 		subject: {
	// 			id: subjectBId,
	// 			label: "Subject B",
	// 		},
	// 		fromElement: receiveStateId,
	// 		toElement: functionStateId,
	// 		label: "R Message",
	// 		message: undefined,
	// 		senderSubject: undefined,
	// 	},
	// 	{
	// 		type: "sbpm.FunctionStateTransition",
	// 		id: functionStateTransitionId,
	// 		label: "F Message",
	// 		fromElement: functionStateId,
	// 		toElement: sendStateId,
	// 	},
	// ]);
	modeler.addItems([
		{
			type: "sbpm.ProcessNetwork",
			id: "0e9f23b3-5a47-4710-9ffe-59b0e3e7e6e6",
			label: "Default process network",
			position: {
				x: 114,
				y: 51,
			},
		},
		{
			type: "sbpm.Process",
			id: "97b8cae4-13ae-4548-9318-0cbc36002ece",
			label: "Default process",
			contains: [
				"0e9f23b3-5a47-4710-9ffe-59b0e3e7e6e6",
				"0bdc6364-052f-44c5-90df-1ac9c19b73ad",
				"c7515a41-9981-44c2-b9a4-822335035444",
				"174ff5a3-9578-40b9-a7fd-a770a0c2d2ad",
			],
		},
		{
			type: "sbpm.ProcessModel",
			id: "0bdc6364-052f-44c5-90df-1ac9c19b73ad",
			label: "DR-Antragsprozess",
			position: {
				x: 562,
				y: 259,
			},
			contains: ["50ec5149-5f48-4f64-8ea0-58bea1d0ea6d"],
			customData: {
				a: "a",
			},
		},
		{
			id: "c7515a41-9981-44c2-b9a4-822335035444",
			type: "sbpm.ProcessNetworkTransition",
			label: "New process transition",
			fromElement: "0e9f23b3-5a47-4710-9ffe-59b0e3e7e6e6",
			toElement: "0bdc6364-052f-44c5-90df-1ac9c19b73ad",
		},
		{
			type: "sbpm.StandardLayer",
			id: "50ec5149-5f48-4f64-8ea0-58bea1d0ea6d",
			label: "DR-Antragsprozess-Layer",
			position: {
				x: 504,
				y: 267,
			},
			contains: [
				"d050e2b2-358e-4845-9380-7174c327010c",
				"fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
				"a5611e4d-78be-4db2-9e2e-10ed91013aeb",
				"cab8c178-c318-43bb-af5d-78d88e5b84d3",
				"17973742-f199-42d8-a80c-841a1333714b",
				"1b2d1a7e-2127-4ec6-8a47-1afe96bf6a94",
			],
			startSubject: ""
		},
		{
			type: "sbpm.StandardSubject",
			id: "d050e2b2-358e-4845-9380-7174c327010c",
			label: "Kunde",
			position: {
				x: 164,
				y: 316,
			},
			contains: ["2c2e5ac3-90e8-4533-9442-6f73306c4d05"],
		},
		{
			type: "sbpm.StandardSubject",
			id: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
			label: "Reiseagentur",
			position: {
				x: 542,
				y: 313,
			},
			contains: ["50b7f08d-2c8a-443b-852c-48cd6421f38c"],
		},
		{
			type: "sbpm.InterfaceSubject",
			id: "a5611e4d-78be-4db2-9e2e-10ed91013aeb",
			label: "Buchungsagentur",
			position: {
				x: 926,
				y: 303,
			},
			references: "8e909b33-2928-4965-9619-a74856065da3",
		},
		{
			id: "cab8c178-c318-43bb-af5d-78d88e5b84d3",
			type: "sbpm.MessageExchange",
			label: "Nachrichten von Reiseagentur",
			fromElement: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
			toElement: "d050e2b2-358e-4845-9380-7174c327010c",
			contains: [
				"ab7cd486-51f6-475e-86bf-57d71f0e135e",
				"c40c642d-772a-4bc2-8099-d314d437fe80",
			],
			vertices: [
				{
					x: 584.5,
					y: 610,
				},
				{
					x: 206.5,
					y: 610,
				},
			],
		},
		{
			id: "17973742-f199-42d8-a80c-841a1333714b",
			type: "sbpm.MessageExchange",
			label: "Nachrichten von Kunde",
			fromElement: "d050e2b2-358e-4845-9380-7174c327010c",
			toElement: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
			contains: ["59be0853-a414-4feb-a0dc-e151f43786f7"],
		},
		{
			id: "1b2d1a7e-2127-4ec6-8a47-1afe96bf6a94",
			type: "sbpm.MessageExchange",
			label: "Nachrichten von Reiseagentur an externe Prozess",
			fromElement: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
			toElement: "a5611e4d-78be-4db2-9e2e-10ed91013aeb",
			contains: ["fdd1c7de-c934-4afe-9045-d45742c53e56"],
		},
		{
			type: "sbpm.StandardBehavior",
			id: "2c2e5ac3-90e8-4533-9442-6f73306c4d05",
			label: "Verhalten von Kunde",
			position: {
				x: 357,
				y: 192,
			},
			contains: [
				"a10aecc2-594b-4e3e-9c06-caa53c0b9fdb",
				"feab6b73-b5fa-414a-80c1-df3de5a77154",
				"c1b2051a-6599-4478-a981-4078fb858297",
				"1f13bab7-f1f4-4894-b1ff-e5b50a4cc038",
				"480e2bf6-157b-4ff1-ae1d-43e9e18c8c3f",
				"819cae2d-e27e-45a3-b77f-4e46c4159583",
				"55cfcc48-2e83-4945-87bd-c3ed63ca0551",
				"cfb72b29-bdee-4f28-9a82-546a48d012ab",
				"4dfbc975-2805-4e8b-8e80-563d325bf40a",
				"194c8a0b-189f-482c-a4dc-610244761bf9",
			],
		},
		{
			type: "sbpm.FunctionState",
			id: "a10aecc2-594b-4e3e-9c06-caa53c0b9fdb",
			label: "DR-Antrag ausfüllen",
			position: {
				x: 554,
				y: 138,
			},
			role: "start",
		},
		{
			type: "sbpm.ReceiveState",
			id: "feab6b73-b5fa-414a-80c1-df3de5a77154",
			label: "Entscheidung erwarten",
			position: {
				x: 541,
				y: 683,
			},
		},
		{
			type: "sbpm.SendState",
			id: "c1b2051a-6599-4478-a981-4078fb858297",
			label: "DR-Antrag senden",
			position: {
				x: 547,
				y: 435,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: "1f13bab7-f1f4-4894-b1ff-e5b50a4cc038",
			label: "DR druchführen",
			position: {
				x: 304,
				y: 864,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: "480e2bf6-157b-4ff1-ae1d-43e9e18c8c3f",
			label: "Ende",
			position: {
				x: 859,
				y: 870,
			},
			role: "end",
		},
		{
			id: "819cae2d-e27e-45a3-b77f-4e46c4159583",
			type: "sbpm.FunctionStateTransition",
			label: "DR-Antrag ausgefüllt",
			fromElement: "a10aecc2-594b-4e3e-9c06-caa53c0b9fdb",
			toElement: "c1b2051a-6599-4478-a981-4078fb858297",
		},
		{
			id: "55cfcc48-2e83-4945-87bd-c3ed63ca0551",
			type: "sbpm.SendStateTransition",
			label: "Send state transition",
			fromElement: "c1b2051a-6599-4478-a981-4078fb858297",
			toElement: "feab6b73-b5fa-414a-80c1-df3de5a77154",
			message: {
				id: "59be0853-a414-4feb-a0dc-e151f43786f7",
				label: "DR-Antrag",
			},
			receiverSubject: {
				id: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
				label: "Reiseagentur",
			},
		},
		{
			type: "sbpm.MessageSpecification",
			id: "59be0853-a414-4feb-a0dc-e151f43786f7",
			label: "DR-Antrag",
			position: {
				x: 409,
				y: 362,
			},
		},
		{
			type: "sbpm.MessageSpecification",
			id: "ab7cd486-51f6-475e-86bf-57d71f0e135e",
			label: "DR-Gehnemigung",
			position: {
				x: 360,
				y: 310,
			},
		},
		{
			type: "sbpm.MessageSpecification",
			id: "c40c642d-772a-4bc2-8099-d314d437fe80",
			label: "DR-Ablehnung",
			position: {
				x: 586,
				y: 309,
			},
		},
		{
			type: "sbpm.MessageSpecification",
			id: "fdd1c7de-c934-4afe-9045-d45742c53e56",
			label: "DR-Antrag",
			position: {
				x: 347,
				y: 334,
			},
		},
		{
			id: "cfb72b29-bdee-4f28-9a82-546a48d012ab",
			type: "sbpm.ReceiveStateTransition",
			label: "Receive state transition",
			fromElement: "feab6b73-b5fa-414a-80c1-df3de5a77154",
			toElement: "1f13bab7-f1f4-4894-b1ff-e5b50a4cc038",
			message: {
				id: "ab7cd486-51f6-475e-86bf-57d71f0e135e",
				label: "DR-Gehnemigung",
			},
			senderSubject: {
				id: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
				label: "Reiseagentur",
			},
			vertices: [
				{
					x: 349,
					y: 743.1,
				},
			],
		},
		{
			id: "4dfbc975-2805-4e8b-8e80-563d325bf40a",
			type: "sbpm.ReceiveStateTransition",
			label: "Receive state transition",
			fromElement: "feab6b73-b5fa-414a-80c1-df3de5a77154",
			toElement: "480e2bf6-157b-4ff1-ae1d-43e9e18c8c3f",
			message: {
				id: "c40c642d-772a-4bc2-8099-d314d437fe80",
				label: "DR-Ablehnung",
			},
			senderSubject: {
				id: "fd3f66af-ed8f-4238-9b7c-c4e17f10f80a",
				label: "Reiseagentur",
			},
			vertices: [
				{
					x: 904,
					y: 743.1,
				},
			],
		},
		{
			id: "194c8a0b-189f-482c-a4dc-610244761bf9",
			type: "sbpm.FunctionStateTransition",
			label: "DR angetreten",
			fromElement: "1f13bab7-f1f4-4894-b1ff-e5b50a4cc038",
			toElement: "480e2bf6-157b-4ff1-ae1d-43e9e18c8c3f",
		},
		{
			type: "sbpm.StandardBehavior",
			id: "50b7f08d-2c8a-443b-852c-48cd6421f38c",
			label: "Verhalten Reiseagentur",
			position: {
				x: 459,
				y: 367,
			},
			contains: [
				"1e0173e7-20bb-4c6e-bfd3-5cf369aae278",
				"db95583a-59bb-4331-af61-ca097c6a1ad5",
				"1c26c916-d266-4554-b5c7-0d4ed2590b49",
				"685536bc-a290-4086-85a5-80d5e1f41763",
				"461901e3-80bd-440c-b2e4-574aa9382768",
				"f9a09fbb-05d8-410e-aa95-a7303745ef91",
				"ec85ac30-3dec-4066-a693-745d2f8ffb88",
				"d54d70ff-6942-4c87-9b5e-e7fc98ae8c85",
				"4b8cce0a-72d6-4645-87a7-78ee19119665",
				"ff351c6e-2493-4bfb-bb82-058469e7bbd1",
				"c143dfd7-b43b-475a-94c4-065c4516fdf3",
				"6508611f-b21f-4de2-8c2b-d41ca4f549ba",
				"bc656f0c-ce84-4f66-8303-60b93f84899c",
				"9f3203fd-e32a-4c8a-8414-69508a3a843c",
				"1ae2ec75-f158-4632-840d-862d5f98c340",
				"3e6c2e9b-2263-4f0a-935a-bb75da1c2fca",
			],
		},
		{
			type: "sbpm.ReceiveState",
			id: "1e0173e7-20bb-4c6e-bfd3-5cf369aae278",
			label: "DR-Antrag empfangen",
			position: {
				x: 567,
				y: 184,
			},
			role: "start",
		},
		{
			type: "sbpm.FunctionState",
			id: "db95583a-59bb-4331-af61-ca097c6a1ad5",
			label: "DR-Antrag prüfen",
			position: {
				x: 580,
				y: 451,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: "1c26c916-d266-4554-b5c7-0d4ed2590b49",
			label: "DR-Antrag genehmigen",
			position: {
				x: 333,
				y: 688,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: "685536bc-a290-4086-85a5-80d5e1f41763",
			label: "DR-Antrag ablehnen",
			position: {
				x: 819,
				y: 711,
			},
		},
		{
			type: "sbpm.SendState",
			id: "461901e3-80bd-440c-b2e4-574aa9382768",
			label: "DR-Genehmigung senden",
			position: {
				x: 311,
				y: 1016,
			},
		},
		{
			type: "sbpm.SendState",
			id: "f9a09fbb-05d8-410e-aa95-a7303745ef91",
			label: "DR-Ablehnung senden",
			position: {
				x: 811,
				y: 1018,
			},
		},
		{
			type: "sbpm.SendState",
			id: "ec85ac30-3dec-4066-a693-745d2f8ffb88",
			label: "DR-Genehmigung senden",
			position: {
				x: 310,
				y: 1332,
			},
		},
		{
			type: "sbpm.FunctionState",
			id: "d54d70ff-6942-4c87-9b5e-e7fc98ae8c85",
			label: "Ende",
			position: {
				x: 832,
				y: 1301,
			},
			role: "end",
		},
		{
			id: "4b8cce0a-72d6-4645-87a7-78ee19119665",
			type: "sbpm.ReceiveStateTransition",
			label: "Receive state transition",
			fromElement: "1e0173e7-20bb-4c6e-bfd3-5cf369aae278",
			toElement: "db95583a-59bb-4331-af61-ca097c6a1ad5",
			message: {
				id: "59be0853-a414-4feb-a0dc-e151f43786f7",
				label: "DR-Antrag",
			},
			senderSubject: {
				id: "d050e2b2-358e-4845-9380-7174c327010c",
				label: "Kunde",
			},
		},
		{
			id: "ff351c6e-2493-4bfb-bb82-058469e7bbd1",
			type: "sbpm.FunctionStateTransition",
			label: "DR-Antrag geprüft",
			fromElement: "db95583a-59bb-4331-af61-ca097c6a1ad5",
			toElement: "1c26c916-d266-4554-b5c7-0d4ed2590b49",
			vertices: [
				{
					x: 378,
					y: 540.12,
				},
			],
		},
		{
			id: "c143dfd7-b43b-475a-94c4-065c4516fdf3",
			type: "sbpm.FunctionStateTransition",
			label: "DR-Antrag geprüft",
			fromElement: "db95583a-59bb-4331-af61-ca097c6a1ad5",
			toElement: "685536bc-a290-4086-85a5-80d5e1f41763",
			vertices: [
				{
					x: 864,
					y: 540.12,
				},
			],
		},
		{
			id: "6508611f-b21f-4de2-8c2b-d41ca4f549ba",
			type: "sbpm.FunctionStateTransition",
			label: "DR-Antrag genehmigt",
			fromElement: "1c26c916-d266-4554-b5c7-0d4ed2590b49",
			toElement: "461901e3-80bd-440c-b2e4-574aa9382768",
		},
		{
			id: "bc656f0c-ce84-4f66-8303-60b93f84899c",
			type: "sbpm.SendStateTransition",
			label: "Send state transition",
			fromElement: "461901e3-80bd-440c-b2e4-574aa9382768",
			toElement: "ec85ac30-3dec-4066-a693-745d2f8ffb88",
			message: {
				id: "ab7cd486-51f6-475e-86bf-57d71f0e135e",
				label: "DR-Gehnemigung",
			},
			receiverSubject: {
				id: "d050e2b2-358e-4845-9380-7174c327010c",
				label: "Kunde",
			},
		},
		{
			id: "9f3203fd-e32a-4c8a-8414-69508a3a843c",
			type: "sbpm.SendStateTransition",
			label: "Send state transition",
			fromElement: "ec85ac30-3dec-4066-a693-745d2f8ffb88",
			toElement: "d54d70ff-6942-4c87-9b5e-e7fc98ae8c85",
			message: {
				id: "fdd1c7de-c934-4afe-9045-d45742c53e56",
				label: "DR-Antrag",
			},
			receiverSubject: {
				id: "a5611e4d-78be-4db2-9e2e-10ed91013aeb",
				label: "Buchungsagentur",
			},
		},
		{
			id: "1ae2ec75-f158-4632-840d-862d5f98c340",
			type: "sbpm.FunctionStateTransition",
			label: "DR-Antrag abgelehnt",
			fromElement: "685536bc-a290-4086-85a5-80d5e1f41763",
			toElement: "f9a09fbb-05d8-410e-aa95-a7303745ef91",
		},
		{
			id: "3e6c2e9b-2263-4f0a-935a-bb75da1c2fca",
			type: "sbpm.SendStateTransition",
			label: "Send state transition",
			fromElement: "f9a09fbb-05d8-410e-aa95-a7303745ef91",
			toElement: "d54d70ff-6942-4c87-9b5e-e7fc98ae8c85",
			message: {
				id: "c40c642d-772a-4bc2-8099-d314d437fe80",
				label: "DR-Ablehnung",
			},
			receiverSubject: {
				id: "d050e2b2-358e-4845-9380-7174c327010c",
				label: "Kunde",
			},
		},
		{
			type: "sbpm.ProcessModel",
			id: "174ff5a3-9578-40b9-a7fd-a770a0c2d2ad",
			label: "DR-Buchungsprozess",
			position: {
				x: 253,
				y: 449,
			},
			contains: ["514efaa4-fc52-42db-a429-ba7c6fa891ec"],
			customData: {
				a: "a",
			},
		},
		{
			type: "sbpm.StandardLayer",
			id: "514efaa4-fc52-42db-a429-ba7c6fa891ec",
			label: "DR-Buchungsprozess-Layer",
			position: {
				x: 169,
				y: 115,
			},
			contains: ["8e909b33-2928-4965-9619-a74856065da3"],
		},
		{
			type: "sbpm.StandardSubject",
			id: "8e909b33-2928-4965-9619-a74856065da3",
			label: "Buchungsagentur",
			position: {
				x: 222,
				y: 141,
			},
			contains: [],
		},
	]);
}
