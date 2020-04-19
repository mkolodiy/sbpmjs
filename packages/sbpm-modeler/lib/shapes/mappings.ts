import { ShapeType } from '../common/constants';
import { GenericOptions } from '../common/types';
import {
  createMessageTransitionOptions,
  createSendStateTransitionOptions,
  createReceiveStateTransitionOptions,
  createFunctionStateTransitionOptions
} from './links';
import { createStateUpdateOptions } from './common/elements';
import {
  createSendStateTransitionUpdateOptions,
  createReceiveStateTransitionUpdateOptions,
  createFunctionStateTransitionUpdateOptions
} from './common/link';
import { noop } from '../common/utils';
import { createStandardSubjectUpdateOptions } from './elements/standard-subject';
import { createSendStateUpdateOptions } from './elements/send-state';

const elementLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions,
  [ShapeType.SEND_STATE]: createSendStateTransitionOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateTransitionOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateTransitionOptions
};

const updateOptionsMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createStandardSubjectUpdateOptions,
  [ShapeType.SEND_STATE]: createSendStateUpdateOptions,
  [ShapeType.RECEIVE_STATE]: createStateUpdateOptions,
  [ShapeType.FUNCTION_STATE]: createStateUpdateOptions,
  [ShapeType.MESSAGE_TRANSITION]: noop,
  [ShapeType.SEND_STATE_TRANSITION]: createSendStateTransitionUpdateOptions,
  [ShapeType.RECEIVE_STATE_TRANSITION]: createReceiveStateTransitionUpdateOptions,
  [ShapeType.FUNCTION_STATE_TRANSITION]: createFunctionStateTransitionUpdateOptions
};

export { elementLinkMapping, updateOptionsMapping };
