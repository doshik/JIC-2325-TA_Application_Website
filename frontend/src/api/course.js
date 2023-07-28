import { get, post } from "./main";

// function to get all courses for a professor
export const getProfCourses = async () => {
  const response = await get("/course/prof/get").catch((err) => {
    throw err;
  });
  return response.data;
};

// function to get all courses for a student
export const getStudentCourses = async () => {
  const response = await get("/course/student/get").catch((err) => {
    throw err;
  });
  return response.data;
};

// function to get a course for a professor
export const getCourse = async (courseId) => {
  const response = await get("/course/prof/getacourse", {courseId: courseId}).catch((err) => {
    throw err;
  });
  return response.data;
};

// function to update a course
export const updateCourse = async (id, applicationTemplate, active, description, msBookingsLink) => {
  const response = await post("/course/update", {
    id: id,
    applicationTemplate: applicationTemplate,
    active: active,
    description: description,
    msBookingsLink: msBookingsLink,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
