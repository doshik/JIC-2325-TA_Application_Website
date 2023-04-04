import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import applicationReducer from "./applicationReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  application: applicationReducer,
  course: courseReducer,
});
