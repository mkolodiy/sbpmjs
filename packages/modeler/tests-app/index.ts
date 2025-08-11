import { SbpmModeler } from "../dist/index.js";

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
	new SbpmModeler({ container });
}
