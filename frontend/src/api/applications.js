import { get, post, del } from "./main";

// a function to get all applications for a student
export const getStudentApplications = async () => {
  const response = await get(`/application/student/get-submissions`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to get all applications for a student
export const getProfApplications = async (course) => {
  const response = await get(`/application/prof/get-submissions?course=${course}`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to create an application for a student
export const createApplication = async (responses, course, submitted) => {
  const response = await post(`/application/save-submission`, {
    responses, course, submitted
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to delete an application for a student
export const deleteApplication = async (id) => {
  const response = await post(`/application/delete-submission`, {
    id,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to update an application for a student
export const updateApplication = async (id, responses, submitted) => {
  const response = await post(`/application/update-submission`, {
    id,
    responses,
    submitted
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to update an application status
export const updateApplicationStatus = async (id, status) => {
  const response = await post(`/application/update-status`, {
    id,
    status,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
