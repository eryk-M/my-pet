import {
  POST_USER_BEGIN,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_USER_SUCCESS,
  LOGOUT_USER,
  SET_AUTH,
  GET_AUTHENTICATED_USER,
  LOADING_USER,
  POKA_ERRORA
} from "../types";

const initialState = {
  data: {},
  loading: false,
  auth: false,
  errors: {},
  details: {}
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
        loading: false
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case POKA_ERRORA:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
