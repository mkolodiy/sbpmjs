import {
  SendStateTransitionUpdateOptions,
  ReceiveStateTransitionUpdateOptions,
  FunctionStateTransitionUpdateOptions
} from '../../common/types';

export const createSendStateTransitionUpdateOptions = (
  options: SendStateTransitionUpdateOptions
) => {
  const { receiver, message } = options;
  let attrs = {};

  if (receiver) {
    attrs = {
      headerText: {
        textWrap: {
          text: receiver
        }
      }
    };
  }

  if (message) {
    attrs = {
      bodyText: {
        textWrap: {
          text: message
        }
      },
      ...attrs
    };
  }

  return { attrs };
};

export const createReceiveStateTransitionUpdateOptions = (
  options: ReceiveStateTransitionUpdateOptions
) => {
  const { sender, message } = options;
  let attrs = {};

  if (sender) {
    attrs = {
      headerText: {
        textWrap: {
          text: sender
        }
      }
    };
  }

  if (message) {
    attrs = {
      bodyText: {
        textWrap: {
          text: message
        }
      },
      ...attrs
    };
  }

  return { attrs };
};

export const createFunctionStateTransitionUpdateOptions = (
  options: FunctionStateTransitionUpdateOptions
) => {
  const { action } = options;
  let attrs = {};

  if (action) {
    attrs = {
      text: {
        textWrap: {
          text: action
        }
      }
    };
  }

  return { attrs };
};
