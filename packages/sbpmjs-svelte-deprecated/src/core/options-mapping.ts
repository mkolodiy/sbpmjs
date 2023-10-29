import type { SbpmShapeType, SbpmProcessItem } from '@sbpmjs/shared';
import type { SelectOption } from '../common/types';
import { getMessages, getReceiverSubjects, getReceiveTransitions, getSenderSubjects, getSenderTransitions } from './manager';
import { activeProcessModelId, activeSubjectId, currentlySelectedSbpmShape } from './svelte-stores/currentlySelectedSbpmShape';
import { currentlySelectedNavigatorItem } from './svelte-stores/elementNavigatorItems';
import { get } from 'svelte/store';

type Option = {
  label: string;
  disabled: boolean;
  type: 'input' | 'select';
  selectOptions?: SelectOption[] | ((dependency?: string) => SelectOption[]);
  dependency?: string;
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
      selectOptions: [
        {
          id: 'single',
          label: 'single',
        },
        {
          id: 'multi',
          label: 'multi',
        },
      ],
    },
  }),
  ...createOptions('Message', {
    id: { ...id },
    label: { ...label },
  }),
  ...createOptions('Subject', {
    id: { ...id },
    label: { ...label },
    representation: {
      label: 'Representation:',
      disabled: false,
      type: 'select',
      selectOptions: [
        {
          id: 'human',
          label: 'human',
        },
        {
          id: 'machine',
          label: 'machine',
        },
      ],
    },
  }),
  ...createOptions('SendState', {
    id: { ...id },
    label: { ...label },
    role: {
      label: 'Role:',
      disabled: false,
      type: 'select',
      selectOptions: [
        {
          id: 'start',
          label: 'start',
        },
        {
          id: 'end',
          label: 'end',
        },
        {
          id: 'none',
          label: 'none',
        },
      ],
    },
  }),
  ...createOptions('ReceiveState', {
    id: { ...id },
    label: { ...label },
    role: {
      label: 'Role:',
      disabled: false,
      type: 'select',
      selectOptions: [
        {
          id: 'start',
          label: 'start',
        },
        {
          id: 'end',
          label: 'end',
        },
        {
          id: 'none',
          label: 'none',
        },
      ],
    },
  }),
  ...createOptions('FunctionState', {
    id: { ...id },
    label: { ...label },
    role: {
      label: 'Role:',
      disabled: false,
      type: 'select',
      selectOptions: [
        {
          id: 'start',
          label: 'start',
        },
        {
          id: 'end',
          label: 'end',
        },
        {
          id: 'none',
          label: 'none',
        },
      ],
    },
  }),
  ...createOptions('ProcessTransition', {
    id: { ...id },
  }),
  ...createOptions('MessageTransition', {
    id: { ...id },
    label: { ...label },
    role: {
      label: 'Role:',
      disabled: false,
      type: 'select',
      selectOptions: [
        {
          id: 'unidirectional',
          label: 'unidirectional',
        },
        {
          id: 'bidirectional',
          label: 'bidirectional',
        },
      ],
    },
  }),
  ...createOptions('FunctionStateTransition', {
    id: { ...id },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'input',
    },
  }),
  ...createOptions('SendStateTransition', {
    id: { ...id },
    subject: {
      label: 'Subject:',
      disabled: false,
      type: 'select',
      selectOptions() {
        const subjects = getSenderSubjects(getSenderTransitions(get(activeProcessModelId), get(activeSubjectId)), get(activeSubjectId));
        return subjects.map((subject) => ({
          id: subject.properties.id,
          label: subject.properties.label,
        }));
      },
    },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'select',
      dependency: 'subject',
      selectOptions: (subjectId?: string) => {
        const transitions = getSenderTransitions(get(activeProcessModelId), get(activeSubjectId));
        const transition = transitions.find(
          (transition) =>
            (transition.properties.source === subjectId && transition.properties.target === get(activeSubjectId)) ||
            (transition.properties.target === subjectId && transition.properties.source === get(activeSubjectId))
        );
        if (!transition) {
          return [];
        }

        const messages = getMessages(transition.properties.id);
        console.log(messages);

        return messages.map((message) => ({
          id: message.properties.id,
          label: message.properties.label,
        }));
      },
    },
  }),
  ...createOptions('ReceiveStateTransition', {
    id: { ...id },
    subject: {
      label: 'Subject:',
      disabled: false,
      type: 'select',
      selectOptions() {
        const subjects = getReceiverSubjects(getReceiveTransitions(get(activeProcessModelId), get(activeSubjectId)), get(activeSubjectId));
        return subjects.map((subject) => ({
          id: subject.properties.id,
          label: subject.properties.label,
        }));
      },
    },
    message: {
      label: 'Message:',
      disabled: false,
      type: 'select',
      dependency: 'subject',
      selectOptions(subjectId?: string) {
        const transitions = getReceiveTransitions(get(activeProcessModelId), get(activeSubjectId));
        const transition = transitions.find(
          (transition) =>
            (transition.properties.source === subjectId && transition.properties.target === get(activeSubjectId)) ||
            (transition.properties.target === subjectId && transition.properties.source === get(activeSubjectId))
        );
        if (!transition) {
          return [];
        }

        const messages = getMessages(transition.properties.id);
        console.log(messages);

        return messages.map((message) => ({
          id: message.properties.id,
          label: message.properties.label,
        }));
      },
    },
  }),
};
