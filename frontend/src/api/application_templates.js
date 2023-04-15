import { get, post, del } from "./main";

// a function to get all application templates for a professor
export const getApplicationTemplates = async () => {
  const response = await get(`/application_templates/get-templates`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to create a custom application template for a professor
export const createApplicationTemplate = async (name, questions) => {
  const response = await post(`/application_templates/save-template`, {
    name,
    questions,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to delete a custom application template for a professor
export const deleteApplicationTemplate = async (id) => {
  const response = await post(`/application_templates/delete-template`, {
    id,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to update a custom application template for a professor
export const updateApplicationTemplate = async (id, name, questions) => {
  const response = await post(`/application_templates/update-template`, {
    id,
    name,
    questions,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
