import { ShapeType } from '../common/constants';
import { GenericOptions } from '../common/types';
import {
  createMessageTransitionOptions,
  createSendStateTransitionOptions,
  createReceiveStateTransitionOptions,
  createFunctionStateTransitionOptions
} from './links';
import {
  createStateUpdateOptions,
  createSubjectUpdateOptions
} from './common/elements';
import { recreateStandardSubject } from './elements';
import {
  createSendStateTransitionUpdateOptions,
  createReceiveStateTransitionUpdateOptions,
  createFunctionStateTransitionUpdateOptions
} from './common/link';
import { noop } from '../common/utils';

const elementLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions,
  [ShapeType.SEND_STATE]: createSendStateTransitionOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateTransitionOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateTransitionOptions
};

const updateOptionsMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createSubjectUpdateOptions,
  [ShapeType.SEND_STATE]: createStateUpdateOptions,
  [ShapeType.RECEIVE_STATE]: createStateUpdateOptions,
  [ShapeType.FUNCTION_STATE]: createStateUpdateOptions,
  [ShapeType.MESSAGE_TRANSITION]: noop,
  [ShapeType.SEND_STATE_TRANSITION]: createSendStateTransitionUpdateOptions,
  [ShapeType.RECEIVE_STATE_TRANSITION]: createReceiveStateTransitionUpdateOptions,
  [ShapeType.FUNCTION_STATE_TRANSITION]: createFunctionStateTransitionUpdateOptions
};

const recreateElementMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: recreateStandardSubject
};

const recreateElement = (type: ShapeType, options: GenericOptions) => {
  const recreationCheck = recreateElementMapping[type];
  return recreationCheck && recreationCheck(options);
};

export { elementLinkMapping, updateOptionsMapping, recreateElement };
