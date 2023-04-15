import { GET_COURSES, COURSES_ERROR } from "../actions/types";
import { getProfCourses, getStudentCourses, updateCourse } from "../../api/course";

// Get all courses for a professor
export const getProfCoursesAction = () => async (dispatch) => {
  try {
    const response = await getProfCourses();
    dispatch({
      type: GET_COURSES,
      payload: response.courses,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err,
    });
  }
};

// Get all courses for a student
export const getStudentCoursesAction = () => async (dispatch) => {
  try {
    const response = await getStudentCourses();
    dispatch({
      type: GET_COURSES,
      payload: response.courses,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err,
    });
  }
};

// update a course
export const updateCourseAction =
  (id, application, active) => async (dispatch) => {
    try {
      const response = await updateCourse(id, application, active);
      dispatch({
        type: GET_COURSES,
        payload: response.courses,
      });
    } catch (err) {
      dispatch({
        type: COURSES_ERROR,
        payload: err,
      });
    }
  };
