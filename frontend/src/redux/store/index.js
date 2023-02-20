import {configureStore} from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/index";

const store = configureStore({ reducer: rootReducer, middleware: [thunk, logger]});

export default store;
