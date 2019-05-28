import {
  POST_USER_BEGIN,
  POST_USER_SUCCESS,
  POST_USER_FAIL,
  GET_USER_SUCCESS,
  LOGOUT_USER,
  SET_AUTH
} from "../types";

import axios from "axios";

export const postLogin = (data, history) => dispatch => {
  dispatch({ type: POST_USER_BEGIN });
  axios
    .post("/login", data)
    .then(res => {
      setAuthToken(res.data.token);
      //todo

      dispatch({ type: POST_USER_SUCCESS });
      history.push("/profile");
    })
    .catch(err => {
      dispatch({ type: POST_USER_FAIL, payload: err.response.data });
    });
};

export const postRegister = (data, history) => dispatch => {
  dispatch({ type: POST_USER_BEGIN });
  axios
    .post("/register", data)
    .then(res => {
      setAuthToken(res.data.token);
      dispatch({ type: POST_USER_SUCCESS });
      dispatch(getUserDetails());
      history.push("/login");
    })
    .catch(err => {
      dispatch({ type: POST_USER_FAIL, payload: err.response.data });
    });
};
export const getUserDetails = nickName => dispatch => {
  dispatch({ type: POST_USER_BEGIN });
  axios
    .get(`/users/${nickName}`)
    .then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: POST_USER_FAIL });
    });
};

export const checkAuth = token => dispatch => {
  if (token.exp * 1000 < Date.now()) {
    return false;
  } else {
    dispatch({ type: SET_AUTH });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: LOGOUT_USER });
};

const setAuthToken = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};