import {
  SAVE_APPLICATION_TEMPLATES,
  GET_APPLICATION_TEMPLATES,
  APPLICATION_TEMPLATES_ERROR,
} from "../actions/types";

const initialState = {
  applicationTemplates: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_APPLICATION_TEMPLATES:
      return {
        ...state,
        applicationTemplates: action.payload,
      };
    case GET_APPLICATION_TEMPLATES:
      return {
        ...state,
        applicationTemplates: action.payload,
      };
    case APPLICATION_TEMPLATES_ERROR:
      return {
        ...state,
        applicationTemplates: [],
      };
    default:
      return state;
  }
}
