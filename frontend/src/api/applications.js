import { get, post, del } from "./main";

// a function to get all applications for a student
export const getStudentApplications = async () => {
  const response = await get(`/application/student/get-submissions`).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to get all applications for a student
export const getProfApplications = async (course, sort_by_gpa=false, sort_by_year=false, majors=[], coursesTaken=[], coursesTaking=[]) => {
  // Determine the sorting order based on the provided flags
  let sortBy = '';
  if (sort_by_gpa) {
    sortBy = 'gpa';
  } else if (sort_by_year) {
    sortBy = 'year';
  }

  // Construct the request URL with all provided parameters
  const requestURL = `/application/prof/get-submissions?course=${course}` +
      (majors && majors.length != 0 ? `&major=${majors}` : '') +
      (coursesTaken && coursesTaken.length != 0? `&coursesTaken=${coursesTaken}` : '') +
      (coursesTaking && coursesTaking.length != 0 ? `&coursesTaking=${coursesTaking}` : '') +
      (sortBy ? `&sortBy=${sortBy}&order=desc` : '');

  const response = await get(requestURL).catch((err) => {
    throw err;
  });
  return response.data;
};

// a function to create an application for a student
export const createApplication = async (responses, course, submitted, file) => {
  const formData = new FormData();

  formData.append("responses", JSON.stringify(responses));
  formData.append("course", JSON.stringify(course));
  formData.append("submitted", submitted);

  if (file) {
    console.log("file, ", file);
    formData.append("file", file);
  }

  const response = await post(`/application/save-submission`, formData).catch((err) => {
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
export const updateApplicationStatus = async (id, status, course, email) => {
  const response = await post(`/application/update-status`, {
    id,
    status,
    course,
    email
  }).catch((err) => {
    throw err;
  });
  return response.data;
};