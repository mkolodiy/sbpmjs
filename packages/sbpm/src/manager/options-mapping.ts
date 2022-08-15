import type { SbpmShapeType } from '@sbpmjs/shared';

type Option = {
  label: string;
  disabled: boolean;
};

type Options = {
  [key: string]: Option;
};

const id: Option = {
  label: 'Id:',
  disabled: true,
};

const label: Option = {
  label: 'Label:',
  disabled: false,
};

const commonOptions: Options = {
  id: { ...id },
  label: { ...label },
};

export const optionsMapping: Record<SbpmShapeType, Options> = {
  ProcessNetwork: commonOptions,
  ProcessModel: commonOptions,
  Message: commonOptions,
  Subject: commonOptions,
  SendState: commonOptions,
  ReceiveState: commonOptions,
  FunctionState: commonOptions,
  ProcessTransition: {},
  MessageTransition: commonOptions,
  FunctionStateTransition: {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
    },
  },
  SendStateTransition: {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
    },
    subject: {
      label: 'Subject:',
      disabled: false,
    },
  },
  ReceiveStateTransition: {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
    },
    subject: {
      label: 'Subject:',
      disabled: false,
    },
  },
};
