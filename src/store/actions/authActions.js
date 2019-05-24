import { POST_USER_BEGIN, POST_USER_SUCCESS, POST_USER_FAIL } from "../types";

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
      history.push("/login");
    })
    .catch(err => {
      dispatch({ type: POST_USER_FAIL, payload: err.response.data });
    });
};

// export const logoutUser = () => dispatch => {
//     localStorage.removeItem("FBIdToken");
//     delete axios.defaults.headers.common["Authorization"];
//     dispatch({ type:  });
//   };

const setAuthToken = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
