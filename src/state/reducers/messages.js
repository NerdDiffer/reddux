import {
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  MSG_WARNING
} from '../constants/actionTypes';

const parseMessage = payload => {
  if (typeof payload === 'string') {
    return {
      header: null,
      listItems: null,
      content: payload
    };
  } else {
    const { header, listItems, content } = payload;

    return {
      header,
      listItems,
      content
    };
  }
};

const MessagesReducer = (prevState = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case MSG_SUCCESS: {
      return {
        format: 'success',
        message: { ...parseMessage(payload) }
      };
    }
    case MSG_ERROR: {
      return {
        format: 'error',
        message: { ...parseMessage(payload) }
      };
    }
    case MSG_INFO: {
      return {
        format: 'info',
        message: { ...parseMessage(payload) }
      };
    }
    case MSG_WARNING: {
      return {
        format: 'warning',
        message: { ...parseMessage(payload) }
      };
    }
    default: {
      return prevState;
    }
  }
};

export default MessagesReducer;
