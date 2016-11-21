import {
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  MSG_WARNING
} from '../constants/actionTypes';

const MessagesReducer = (prevState = {}, action) => {
  switch(action.type) {
    case MSG_SUCCESS: {
      return {
        format: 'success',
        message: action.payload
      };
    }
    case MSG_ERROR: {
      return {
        format: 'error',
        message: action.payload
      };
    }
    case MSG_INFO: {
      return {
        format: 'info',
        message: action.payload
      };
    }
    case MSG_WARNING: {
      return {
        format: 'warning',
        message: action.payload
      };
    }
    default: {
      return prevState;
    }
  }
};

export default MessagesReducer;
