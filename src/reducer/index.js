// Store
import { createStore, combineReducers } from "redux";

// Import Reducers
import loginReducer from "./login/index";
import postsReducer from "./posts/index";
import usersReducer from "./users/index";

const reducers = combineReducers({ loginReducer, postsReducer, usersReducer });
const store = createStore(reducers);

export default store;
