import { GET_COURSES, COURSES_ERROR } from "../actions/types";

const initialState = {
  courses: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case COURSES_ERROR:
      return {
        ...state,
        courses: [],
      };
    default:
      return state;
  }
}
