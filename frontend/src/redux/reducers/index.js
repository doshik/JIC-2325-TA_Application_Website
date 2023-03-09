import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  application: applicationReducer,
});
