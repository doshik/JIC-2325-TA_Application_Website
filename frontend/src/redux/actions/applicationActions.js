import {

  SAVE_APPLICATION,

  GET_APPLICATIONS,

  UPDATE_APPLICATION,

  APPLICATION_ERROR,

} from "./types";



import {

  getStudentApplications,

  getProfApplications,

  createApplication,

  deleteApplication,

  updateApplication,

  updateApplicationStatus

} from "../../api/applications";



// Get all applications

export const getStudentApplicationsAction = () => async (dispatch) => {

  try {

    const response = await getStudentApplications();

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




// Get all applications for a course

export const getProfApplicationsAction = (course, sort_by_gpa=false, sort_by_year=false, majors=null, coursesTaken=null, coursesTaking=null) => async (dispatch) => {

  try {

    const response = await getProfApplications(course, sort_by_gpa=sort_by_gpa, sort_by_year=sort_by_year, majors=majors, coursesTaken=coursesTaken, coursesTaking=coursesTaking);

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

    (responses, course, submitted) => async (dispatch) => {

      try {

        const response = await createApplication(responses, course, submitted);

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




// Update an application status

export const updateApplicationStatusAction =

    (id, status, course, email) => async (dispatch) => {

      try {

        const response = await updateApplicationStatus(id, status, course, email);

        dispatch({

          type: UPDATE_APPLICATION,

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

    (id, responses, submitted) => async (dispatch) => {

      try {

        const response = await updateApplication(id, responses, submitted);

        dispatch({

          type: UPDATE_APPLICATION,

          payload: response.submissions,

        });

      } catch (err) {

        dispatch({

          type: APPLICATION_ERROR,

          payload: err,

        });

      }

    };

  