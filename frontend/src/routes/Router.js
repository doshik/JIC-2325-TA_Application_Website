import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProfCourseApplicationPage from "../pages/application/ProfCourseApplicationPage";
import DefaultApplicationFormView from "../pages/application_form/DefaultApplicationFormView";
import CustomApplicationFormView from "../pages/application_form/CustomApplicationFormView";
import ApplicationTemplateView from "../pages/application_templates/ApplicationTemplateView";
import StudentApplicationsView from "../pages/viewing_open_applications/StudentApplicationsView";
import ProfessorDashboardView from "../pages/dashboard/ProfessorDashboardView";
import StudentDashboardView from "../pages/dashboard/StudentDashboardView";
import LoginPage from "../pages/auth/Login";
import Root from "./Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        exact path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route exact path="/login" element={<LoginPage />}></Route>
      <Route exact path="/user" element={<Root />}>
        <Route
          exact
          path="prof/dashboard"
          element={<ProfessorDashboardView />}
        />
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
          path="prof/applicationtemplates"
          element={<ApplicationTemplateView />}
        />
        <Route
          exact
          path="prof/applicationtemplates/default"
          element={<DefaultApplicationFormView />}
        />
        <Route
          exact
          path="prof/applicationtemplates/custom"
          element={<CustomApplicationFormView />}
        />
      
        <Route
          exact
          path="student/dashboard"
          element={<StudentDashboardView />}
        />
        <Route
          exact
          path="student/openapplications"
          element={<StudentApplicationsView />}
        />
      </Route>
    </>
  )
);

export default Router;
