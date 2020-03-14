import { ShapeType } from '../common/constants';
import { createMessageTransitionOptions } from './links/message-transition';
import { GenericOptions } from '../common/types';

const elementToLinkMapping: GenericOptions = {
  [ShapeType.STANDARD_SUBJECT]: createMessageTransitionOptions
};

export default elementToLinkMapping;
