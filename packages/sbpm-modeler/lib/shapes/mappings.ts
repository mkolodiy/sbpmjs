import { ShapeType } from '../common/constants';
import { GenericOptions } from '../common/types';
import {
  createMessageTransitionOptions,
  createSendStateTransitionOptions,
  createReceiveStateTransitionOptions,
  createFunctionStateTransitionOptions
} from './links';
import {
  createElementUpdateOptions,
  createStateUpdateOptions
} from './common/elements';

const elementLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions,
  [ShapeType.SEND_STATE]: createSendStateTransitionOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateTransitionOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateTransitionOptions
};

const updateOptionsMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createElementUpdateOptions,
  [ShapeType.SEND_STATE]: createStateUpdateOptions,
  [ShapeType.RECEIVE_STATE]: createStateUpdateOptions,
  [ShapeType.FUNCTION_STATE]: createStateUpdateOptions
};

export { elementLinkMapping, updateOptionsMapping };
