import { GET_COURSES, COURSES_ERROR } from "../actions/types";
import { getCourses } from "../../api/course";

// Get all courses for a professor
export const getCoursesAction = () => async (dispatch) => {
  try {
    const response = await getCourses();
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
