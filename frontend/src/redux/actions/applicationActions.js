import {
    SAVE_APPLICATION,
    GET_APPLICATIONS,
    APPLICATION_ERROR,
  } from "./types";
  
  import {
    getApplications,
    createApplication,
    deleteApplication,
    updateApplication,
  } from "../../api/applications";
  
  // Get all applications
  export const getApplicationsAction = () => async (dispatch) => {
    try {
      const response = await getApplications();
      dispatch({
        type: GET_APPLICATIONS,
        payload: response.submissions,
      });
    } catch (err) {
      dispatch({
        type: APPLICATION_ERROR,
        payload: err,
      });
    }
  };
  
  // Create a new application
  export const createApplicationAction =
    (responses) => async (dispatch) => {
      try {
        const response = await createApplication(responses);
        dispatch({
          type: SAVE_APPLICATION,
          payload: response.submissions,
        });
      } catch (err) {
        dispatch({
          type: APPLICATION_ERROR,
          payload: err,
        });
      }
    };
  
  // Delete an application
  export const deleteApplicationAction = (id) => async (dispatch) => {
    try {
      const response = await deleteApplication(id);
      dispatch({
        type: SAVE_APPLICATION,
        payload: response.submissions,
      });
    } catch (err) {
      dispatch({
        type: APPLICATION_ERROR,
        payload: err,
      });
    }
  };
  
  // Update an application
  export const updateApplicationAction =
    (id, responses) => async (dispatch) => {
      try {
        const response = await updateApplication(id, responses);
        dispatch({
          type: SAVE_APPLICATION,
          payload: response.submissions,
        });
      } catch (err) {
        dispatch({
          type: APPLICATION_ERROR,
          payload: err,
        });
      }
    };
  