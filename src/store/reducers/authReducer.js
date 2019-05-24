import { POST_USER_BEGIN, POST_USER_SUCCESS, POST_USER_FAIL } from "../types";

const initialState = {
  data: {},
  loading: false,
  auth: false,
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_USER_BEGIN:
      return {
        ...state,
        loading: true
      };
    case POST_USER_SUCCESS:
      return {
        ...action.payload,
        auth: true,
        loading: false,
        errors: {}
      };
    case POST_USER_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
