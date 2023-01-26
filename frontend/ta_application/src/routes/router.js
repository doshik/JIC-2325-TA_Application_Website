import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import Root from "./scenes/root";
import ProfCourseApplicationContainer from "./scenes/ProfCourseApplicationContainer";

const BaseRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/prof/applications/course/:course_id",
    element: <ProfCourseApplicationContainer />,
  },
]);

export default BaseRouter;
