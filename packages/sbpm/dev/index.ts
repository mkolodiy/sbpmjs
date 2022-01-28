import Sbpm from '../src';
import type { SbpmInitialData, SbpmProcess, SbpmOptions, SbpmProcessGroup } from '../src';
import './styles.css';

const exampleProcess: SbpmProcess = [
  {
    type: 'SBPM_PROCESS_GROUP',
    id: '1',
    label: 'Process group',
  },
  {
    type: 'SBPM_PROCESS_MODEL',
    id: '1-1',
    label: 'Process model',
  },
  {
    type: 'SBPM_PROCESS_MODEL',
    id: '1-2',
    label: 'Process model 2',
  },
  {
    type: 'SBPM_STANDARD_LAYER',
    id: '1-1-1',
    label: 'Standard layer 1',
  },
  {
    type: 'SBPM_STANDARD_LAYER',
    id: '1-1-2',
    label: 'Standard layer 2',
  },
];

const options: SbpmOptions = {
  containerIdentifier: 'container',
  initialProcessGroups: createInitialProcessGroups(),
  initialData: [exampleProcess],
};

new Sbpm(options);

function createInitialProcessGroups() {
  const initialProcessGroups: SbpmProcessGroup[] = [];

  for (let i = 0; i < 10; i++) {
    initialProcessGroups.push({
      id: String(i),
      label: `Process group ${i}`,
      type: 'SBPM_PROCESS_GROUP',
      children: [
        {
          id: '1-1',
          label: 'Process model 1',
          type: 'SBPM_PROCESS_MODEL',
          children: [
            {
              id: '1-1-1',
              label: 'Standard layer 1',
              type: 'SBPM_STANDARD_LAYER',
            },
            {
              id: '1-1-2',
              label: 'Standard layer 2',
              type: 'SBPM_STANDARD_LAYER',
            },
          ],
        },
        {
          id: '1-2',
          label: 'Process model 2',
          type: 'SBPM_PROCESS_MODEL',
        },
      ],
    });
  }

  return initialProcessGroups;
}
