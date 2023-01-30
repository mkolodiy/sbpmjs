import type { SbpmShapeType, SbpmProcessItem } from '@sbpmjs/shared';

type Option = {
  label: string;
  disabled: boolean;
  type: 'input' | 'select';
  selectValues?: string[];
};

const id: Option = {
  label: 'Id:',
  disabled: true,
  type: 'input',
};

const label: Option = {
  label: 'Label:',
  disabled: false,
  type: 'input',
};

type Options<Type extends SbpmShapeType = SbpmShapeType> = Partial<Record<keyof SbpmProcessItem<Type>['properties'], Option>>;

function createOptions<Type extends SbpmShapeType = SbpmShapeType>(type: Type, options: Options<Type>) {
  return {
    [type]: options,
  } as Record<SbpmShapeType, Options<Type>>;
}

export const optionsMapping: Record<SbpmShapeType, Options> = {
  ...createOptions('ProcessNetwork', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('ProcessModel', {
    id: { ...id },
    label: { ...label },
    role: {
      label: 'Role:',
      disabled: false,
      type: 'select',
      selectValues: ['single', 'multi'],
    },
  }),
  ...createOptions('Message', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('Subject', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('SendState', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('ReceiveState', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('FunctionState', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('ProcessTransition', {
    id: { ...id },
  }),
  ...createOptions('MessageTransition', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('FunctionStateTransition', {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'select',
    },
  }),
  ...createOptions('SendStateTransition', {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'select',
    },
  }),
  ...createOptions('ReceiveStateTransition', {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'select',
    },
  }),
};
