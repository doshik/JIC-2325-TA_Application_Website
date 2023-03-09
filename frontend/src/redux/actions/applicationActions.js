import {
  SAVE_APPLICATION_TEMPLATES,
  GET_APPLICATION_TEMPLATES,
  APPLICATION_TEMPLATES_ERROR,
} from "../actions/types";

import {
  getApplicationTemplates,
  createApplicationTemplate,
} from "../../api/applications";

// Get all application templates
export const getApplicationTemplatesAction = () => async (dispatch) => {
  try {
    const response = await getApplicationTemplates();
    dispatch({
      type: GET_APPLICATION_TEMPLATES,
      payload: response.templates,
    });
  } catch (err) {
    dispatch({
      type: APPLICATION_TEMPLATES_ERROR,
      payload: err,
    });
  }
};

// Create a new application template
export const createApplicationTemplateAction =
  (name, questions) => async (dispatch) => {
    try {
      const response = await createApplicationTemplate(name, questions);
      dispatch({
        type: SAVE_APPLICATION_TEMPLATES,
        payload: response.templates,
      });
    } catch (err) {
      dispatch({
        type: APPLICATION_TEMPLATES_ERROR,
        payload: err,
      });
    }
  };
