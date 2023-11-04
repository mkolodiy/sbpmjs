import type { SbpmElementType, SbpmType } from '@sbpmjs/shared';
import { functionStateIcon } from '../../icons/sbpm/functionState';
import { messageIcon } from '../../icons/sbpm/message';
import { processModelIcon } from '../../icons/sbpm/processModel';
import { receiveStateIcon } from '../../icons/sbpm/receiveState';
import { sendStateIcon } from '../../icons/sbpm/sendState';
import { subjectIcon } from '../../icons/sbpm/subject';

type PaletteItem = {
  type: SbpmElementType;
  icon: string;
  size: {
    width: number;
    height: number;
  };
  title: string;
};

const paletteItems: Record<SbpmType, PaletteItem[]> = {
  Process: [
    {
      type: 'ProcessModel',
      icon: processModelIcon,
      size: {
        width: 130,
        height: 70,
      },
      title: 'Process Model',
    },
  ],
  ProcessModel: [
    {
      type: 'Subject',
      icon: subjectIcon,
      size: {
        width: 85,
        height: 140,
      },
      title: 'Subject',
    },
  ],
  MessageTransition: [
    {
      type: 'Message',
      icon: messageIcon,
      size: {
        width: 120,
        height: 75,
      },
      title: 'Message',
    },
  ],
  Subject: [
    {
      type: 'SendState',
      icon: sendStateIcon,
      size: {
        width: 140,
        height: 95,
      },
      title: 'Send state',
    },
    {
      type: 'ReceiveState',
      icon: receiveStateIcon,
      size: {
        width: 140,
        height: 95,
      },
      title: 'Receive state',
    },
    {
      type: 'FunctionState',
      icon: functionStateIcon,
      size: {
        width: 90,
        height: 140,
      },
      title: 'Receive state',
    },
  ],
  ProcessNetwork: [],
  Message: [],
  SendState: [],
  ReceiveState: [],
  FunctionState: [],
  ProcessTransition: [],
  FunctionStateTransition: [],
  SendStateTransition: [],
  ReceiveStateTransition: [],
};

export function getPaletteItems(type: SbpmType) {
  return paletteItems[type];
}
