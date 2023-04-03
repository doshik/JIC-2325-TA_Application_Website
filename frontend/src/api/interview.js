import { get, post } from "./main";

// function to submit interview request
export const submitInterviewRequest = async (student, possibleTimes) => {
  const response = await post("/interview/prof/create", {
    student: student,
    possibleTimes: possibleTimes,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};

// function to get all interview requests for a student
export const getStudentInterviewRequests = async () => {
  const response = await get("/interview/student/get").catch((err) => {
    throw err;
  });
  return response.data;
};

// function to get all interview requests for a professor
export const getProfInterviewRequests = async () => {
  const response = await get("/interview/prof/get").catch((err) => {
    throw err;
  });
  return response.data;
};

// function to accept an interview request
export const acceptInterviewRequest = async (
  interviewRequest,
  acceptedTime
) => {
  const response = await post("/interview/student/accept", {
    interviewRequestId: interviewRequest._id,
    acceptedTime: acceptedTime,
  }).catch((err) => {
    throw err;
  });
  return response.data;
};
