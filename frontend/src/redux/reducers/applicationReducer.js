import {
    SAVE_APPLICATION,
    GET_APPLICATIONS,
    APPLICATION_ERROR,
  } from "../actions/types";
  
  const initialState = {
    applications: [],
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SAVE_APPLICATION:
        return {
          ...state,
          applications: action.payload,
        };
      case GET_APPLICATIONS:
        return {
          ...state,
          applications: action.payload,
        };
      case APPLICATION_ERROR:
        return {
          ...state,
          applications: [],
        };
      default:
        return state;
    }
  }
  