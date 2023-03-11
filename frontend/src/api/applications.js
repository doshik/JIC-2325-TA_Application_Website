import { get, post } from "./main";

// a function to get all application templates for a professor
export const getApplicationTemplates = async () => {
  const response = await get(`/application/prof/get-templates`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to create a custom application template for a professor
export const createApplicationTemplate = async (name, questions) => {
  const response = await post(`/application/prof/save-template`, {
    name,
    questions,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};