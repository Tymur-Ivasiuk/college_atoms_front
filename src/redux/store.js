import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import gradebookReducer from "./gradebookReducer";
import groupManagerReducer from "./groupManagerReducer";

let reducers = combineReducers({
  auth: authReducer,
  gradebook: gradebookReducer,
  groupManager: groupManagerReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;