import { get } from "./main";

// function to get all courses for a professor

export const getCourses = async () => {
  const response = await get("/course/get").catch((err) => {
    throw err;
  });
  return response.data;
};
