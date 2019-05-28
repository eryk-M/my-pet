import {
  POST_USER_BEGIN,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_USER_SUCCESS,
  LOGOUT_USER,
  SET_AUTH
} from "../types";

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
    case GET_USER_SUCCESS:
      return {
        data: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        auth: false
      };
    case SET_AUTH:
      return {
        auth: true
      };
    default:
      return state;
  }
}
