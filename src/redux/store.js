import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import gradebookReducer from "./gradebookReducer";

let reducers = combineReducers({
  auth: authReducer,
  gradebook: gradebookReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;