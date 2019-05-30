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
  CLEAR_ERRORS_MESSAGES,
  CHANGE_PASSWORD_SUCCESS
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

export const getAuthUser = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({ type: GET_AUTHENTICATED_USER, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      // dispatch({type: })
    });
};

export const checkAuth = token => dispatch => {
  if (token.exp * 1000 < Date.now()) {
    dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    dispatch(getAuthUser());
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: LOGOUT_USER });
};
export const clearMessagesAndErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS_MESSAGES });
};

const setAuthToken = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getAuthUser());
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: POKA_ERRORA, payload: err.response.data });
    });
};

export const editUserDetails = details => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/editUserDetails", details)
    .then(res => {
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
      dispatch(getAuthUser());
    })
    .catch(err => console.log(err));
};
//DO ZROBIENIAAAAAAAAAAAAAAAA

export const changePassword = data => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/changePassword", data)
    .then(res => {
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: POKA_ERRORA, payload: err.response.data });
    });
};
