// Store
import { createStore, combineReducers } from "redux";

// Import Reducers
import loginReducer from "./login/index";

const reducers = combineReducers({ loginReducer });
const store = createStore(reducers);

export default store;
