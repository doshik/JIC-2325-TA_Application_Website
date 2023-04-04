import {
  SAVE_APPLICATION_TEMPLATES,
  GET_APPLICATION_TEMPLATES,
  APPLICATION_TEMPLATES_ERROR,
} from "../actions/types";

import {
  getApplicationTemplates,
  createApplicationTemplate,
  deleteApplicationTemplate,
  updateApplicationTemplate,
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

// Delete an application template
export const deleteApplicationTemplateAction = (id) => async (dispatch) => {
  try {
    const response = await deleteApplicationTemplate(id);
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

// Update an application template
export const updateApplicationTemplateAction =
  (id, name, questions) => async (dispatch) => {
    try {
      const response = await updateApplicationTemplate(id, name, questions);
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
