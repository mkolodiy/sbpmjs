import { ShapeType } from '../common/constants';
import { GenericOptions } from '../common/types';
import { createMessageTransitionOptions } from './links/message-transition';
import { createSendStateTransitionOptions } from './links/send-state-transition';
import { createReceiveStateTransitionOptions } from './links/receive-state-transition';
import { createFunctionStateTransitionOptions } from './links/function-state-transition';

const elementLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions,
  [ShapeType.SEND_STATE]: createSendStateTransitionOptions,
  [ShapeType.RECEIVE_STATE]: createReceiveStateTransitionOptions,
  [ShapeType.FUNCTION_STATE]: createFunctionStateTransitionOptions
};

export default elementLinkMapping;
