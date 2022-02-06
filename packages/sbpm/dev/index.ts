import Sbpm from '../src';
import type { SbpmProcess, SbpmOptions } from '../src';
import './styles.css';

const exampleProcess: SbpmProcess = [
  {
    type: 'SBPM_PROCESS_GROUP',
    id: '1',
    label: 'Process group',
    contains: ['1-1', '1-2'],
  },
  {
    type: 'SBPM_PROCESS_MODEL',
    id: '1-1',
    label: 'Process model',
    contains: ['1-1-1', '1-1-2'],
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
  initialProcessList: [exampleProcess],
};

new Sbpm(options);
