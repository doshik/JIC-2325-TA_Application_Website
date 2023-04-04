import { get, post } from "./main";

// function to get all courses for a professor
export const getCourses = async () => {
  const response = await get("/course/get").catch((err) => {
    throw err;
  });
  return response.data;
};

// function to update a course
export const updateCourse = async (id, application, active) => {
  const response = await post("/course/update", {
    id: id,
    application: application,
    active: active,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
