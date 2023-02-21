import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_FAILED_LOGIN,
  SET_LOGOUT,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_FAILED_LOGIN:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
