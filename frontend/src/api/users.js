import { get, post } from "./main";
import Cookies from "js-cookie";

// a function to log the user in using the api const above
export const login = async (role) => {
  console.log("login called");
  const response = await post(`/user/login`, {
    role: role,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to check if the user is logged in using the api const above
export const isLoggedIn = async () => {
  const response = await get(`/user/isLoggedIn`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to log the user out using the api const above
export const logout = async () => {
  const response = await get(`/user/logout`).catch((err) => {
    throw err;
  });
  return response.data;
};
