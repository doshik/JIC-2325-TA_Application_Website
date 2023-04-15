import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import applicationReducer from "./applicationReducer";
import applicationTemplateReducer from "./applicationTemplateReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  application: applicationReducer,
  application_templates: applicationTemplateReducer,
  course: courseReducer,
});
