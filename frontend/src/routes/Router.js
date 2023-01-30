import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import ProfCourseApplicationPage from "../pages/application/ProfCourseApplicationPage";
import DefaultApplicationFormView from "../pages/application_form/DefaultApplicationFormView";
import ApplicationTemplateView from "../pages/application_templates/ApplicationTemplateView";
import Root from "./Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Root />}>
        <Route
          exact
          path="prof/course/:courseId"
          loader={({ params }) => {
            return params.courseId;
          }}
          element={<ProfCourseApplicationPage />}
        />
        <Route
          exact
          path="prof/applicationtemplates/defaultform"
          element={<DefaultApplicationFormView />}
        />
        <Route
          exact
          path="prof/applicationtemplates"
          element={<ApplicationTemplateView />}
        />
      </Route>
      <Route exact path="/test" element={<ProfCourseApplicationPage />}></Route>
    </>
  )
);

export default Router;
