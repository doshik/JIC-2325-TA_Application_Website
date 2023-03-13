import axios from "axios";
axios.defaults.withCredentials = true;

export const get = async (url) => {
  console.log(`${process.env.REACT_APP_API_URL}${url}`);
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export const post = async (url, data, headers = null) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}${url}`,
    data: data,
  };
  console.log(`${process.env.REACT_APP_API_URL}${url}`, data);
  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    throw err;
  }
};

export const put = async (url, data) => {
  return await axios.put(`${process.env.REACT_APP_API_URL}${url}`, data);
};

export const del = async (url) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}${url}`);
};
