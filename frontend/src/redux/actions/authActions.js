import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING, SET_FAILED_LOGIN } from "./types";
import { login } from "../../api/users";

// Login - authorize and authenticate user; get a JWT token from the server
export const loginUser = (role) => {
  return async (dispatch) => {
    try {
      const response = await login(role);
      if (response.loggedIn) {
        dispatch({ type: SET_CURRENT_USER, payload: response.user });
      }
    } catch (err) {
      console.log("loginUser failed: " + err);
      dispatch({ type: SET_FAILED_LOGIN, payload: err });
    }
  };
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
