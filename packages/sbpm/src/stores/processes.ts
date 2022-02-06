import { writable } from 'svelte/store';
import { SbpmProcessList, SbpmProcess, SbpmProcessGroup, SbpmProcessModel, SbpmStandardLayer } from '../common/types';

function createStandardLayer(initialStandardLayer: SbpmStandardLayer) {
  const { subscribe, set, update } = writable();
  set(initialStandardLayer);
  return { subscribe, set, update };
}

function createProcessModel(initialProcessModel: SbpmProcessModel) {
  const { subscribe, set, update } = writable();
  set(initialProcessModel);
  return { subscribe, set, update };
}

function createProcessGroup(initialProcessGroup: SbpmProcessGroup) {
  const { subscribe, set, update } = writable();
  set(initialProcessGroup);
  return { subscribe, set, update };
}

function createProcess(initialProcess: SbpmProcess) {
  const { subscribe, set, update } = writable();

  const process = { processGroup: undefined, processModels: [], standardLayers: [] };
  const processGroup = initialProcess.find((element) => element.type === 'SBPM_PROCESS_GROUP');
  const processModels = initialProcess.filter((element) => element.type === 'SBPM_PROCESS_MODEL');
  const standardLayers = initialProcess.filter((element) => element.type === 'SBPM_STANDARD_LAYER');

  //@ts-ignore
  process.processGroup = createProcessGroup(processGroup);
  //@ts-ignore
  processModels.forEach((processModel) => process.processModels.push[createProcessModel(processModel)]);
  //@ts-ignore
  standardLayers.forEach((standardLayer) => process.standardLayers.push[createStandardLayer(standardLayer)]);
  console.log(process.processModels);
  set(process);

  return { subscribe, set, update };
}

function createProcesses() {
  const { subscribe, set, update } = writable();

  function init(processList: SbpmProcessList) {
    const processes = {};
    for (const process of processList) {
      const processGroup = process.find((element) => element.type === 'SBPM_PROCESS_GROUP');
      //@ts-ignore
      processes[processGroup.id] = createProcess(process);
    }

    set(processes);
  }

  return {
    subscribe,
    set,
    update,
    init,
  };
}

export const processes = createProcesses();

