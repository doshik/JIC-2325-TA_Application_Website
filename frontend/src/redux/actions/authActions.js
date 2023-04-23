import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_FAILED_LOGIN,
  SET_LOGOUT,
} from "./types";
import { login, logout } from "../../api/users";
import Cookies from 'js-cookie';

// Login - authorize and authenticate user; get a JWT token from the server
export const loginUser = (role) => {
  return async (dispatch) => {
    try {
      const response = await login(role);
      if (response.loggedIn) {
        dispatch({ type: SET_CURRENT_USER, payload: response.user });
        // Save the JWT access token in a cookie
        const accessToken = Cookies.get('jwt.accessToken');
        document.cookie = `jwt=${accessToken}; path=/;`;

      } else {
        throw new Error("loginUser failed");
      }
    } catch (err) {
      console.log("loginUser failed: " + err);
      dispatch({ type: SET_FAILED_LOGIN, payload: err });
    }
  };
};

// logout user
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await logout();
      if (response.loggedIn === false) {
        dispatch({ type: SET_LOGOUT });
      } else {
        throw new Error("logoutUser failed");
      }
    } catch (err) {
      console.log("logoutUser failed: " + err);
      dispatch({ type: SET_FAILED_LOGIN, payload: err });
    }
  };
};

// Set logged in user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// // Log user out
// export const logoutUser = () => (dispatch) => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };
