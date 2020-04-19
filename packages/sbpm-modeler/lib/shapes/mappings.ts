import { ShapeType } from '../common/constants';
import { GenericOptions } from '../common/types';
import {
  createMessageTransitionOptions,
  createSendStateTransitionOptions,
  createReceiveStateTransitionOptions,
  createFunctionStateTransitionOptions,
  createMessageTransitionUpdateOptions
} from './links';
import {
  createSendStateTransitionUpdateOptions,
  createReceiveStateTransitionUpdateOptions,
  createFunctionStateTransitionUpdateOptions
} from './common/link';
import { noop } from '../common/utils';
import {
  createStandardSubjectUpdateOptions,
  createSendStateUpdateOptions,
  createReceiveStateUpdateOptions,
  createFunctionStateUpdateOptions
} from './elements';

const elementLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions,
  [ShapeType.SEND_STATE]: createSendStateTransitionOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateTransitionOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateTransitionOptions
};

const updateOptionsMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createStandardSubjectUpdateOptions,
  [ShapeType.SEND_STATE]: createSendStateUpdateOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateUpdateOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateUpdateOptions,
  [ShapeType.MESSAGE_TRANSITION]: createMessageTransitionUpdateOptions,
  [ShapeType.SEND_STATE_TRANSITION]: createSendStateTransitionUpdateOptions,
  [ShapeType.RECEIVE_STATE_TRANSITION]: createReceiveStateTransitionUpdateOptions,
  [ShapeType.FUNCTION_STATE_TRANSITION]: createFunctionStateTransitionUpdateOptions
};

export { elementLinkMapping, updateOptionsMapping };
