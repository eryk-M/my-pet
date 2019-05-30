import {
  POST_USER_BEGIN,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_USER_SUCCESS,
  LOGOUT_USER,
  SET_AUTH,
  GET_AUTHENTICATED_USER,
  LOADING_USER,
  POKA_ERRORA,
  EDIT_USER_SUCCESS,
  CLEAR_ERRORS_MESSAGES
} from "../types";

const initialState = {
  data: {},
  loading: false,
  auth: false,
  errors: {},
  details: {},
  message: ""
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
        ...state,
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
        ...state,
        data: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        auth: false,
        details: {},
        loading: false
      };
    case SET_AUTH:
      return {
        ...state,
        auth: true
      };
    case GET_AUTHENTICATED_USER:
      return {
        ...state,
        ...action.payload,
        loading: false,
        errors: {}
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
        errors: {}
      };
    case POKA_ERRORA:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_ERRORS_MESSAGES:
      return {
        ...state,
        errors: {},
        message: ""
      };

    default:
      return state;
  }
}
