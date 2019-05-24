import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import authReducer from "./reducers/authReducer";

const reducers = combineReducers({
  user: authReducer
});

const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));

export default store;
