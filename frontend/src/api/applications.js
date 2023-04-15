import { get, post, del } from "./main";

// a function to get all application templates for a professor
export const getApplications = async () => {
  const response = await get(`/application/get-submissions`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to create a custom application template for a professor
export const createApplication = async (responses) => {
  const response = await post(`/application/save-submission`, {
    responses,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to delete a custom application template for a professor
export const deleteApplication = async (id) => {
  const response = await post(`/application/delete-submission`, {
    id,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to update a custom application template for a professor
export const updateApplication = async (id, responses) => {
  const response = await post(`/application/update-submission`, {
    id,
    responses,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
