import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:5001";

export const get = async (url) => {
  console.log(`${API_BASE_URL}${url}`);
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const post = async (url, data, headers = null) => {
  const config = {
    method: "post",
    url: `${API_BASE_URL}${url}`,
    data: data,
  };
  console.log(`${API_BASE_URL}${url}`, data);
  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const put = async (url, data) => {
  return await axios.put(`${API_BASE_URL}${url}`, data);
};

export const del = async (url) => {
  return await axios.delete(`${API_BASE_URL}${url}`);
};
