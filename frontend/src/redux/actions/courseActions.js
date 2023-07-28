import { GET_COURSES, COURSES_ERROR } from "../actions/types";
import { getProfCourses, getStudentCourses, getCourse, updateCourse } from "../../api/course";

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

// Get a specific course for a professor
export const getCourseAction = (courseId) => async (dispatch) => {
  try {
    const response = await getCourse(courseId);
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
  (id, applicationTemplate, active, description, msBookingsLink) => async (dispatch) => {
    try {
      const response = await updateCourse(id, applicationTemplate, active, description, msBookingsLink);
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
