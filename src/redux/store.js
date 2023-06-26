import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authReducer";
import gradebookReducer from "./gradebookReducer";
import navigateReducer from "./navigateReducer";

let reducers = combineReducers({
  auth: authReducer,
  navigate: navigateReducer,
  gradebook: gradebookReducer,

});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;