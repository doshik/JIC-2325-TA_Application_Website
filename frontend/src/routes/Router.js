import * as React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProfCourseApplicationPage from "../pages/application/ProfCourseApplicationPage";
import DefaultApplicationFormView from "../pages/application_form/DefaultApplicationFormView";
import CustomApplicationFormView from "../pages/application_form/CustomApplicationFormView";
import ApplicationTemplateView from "../pages/application_templates/ApplicationTemplateView";
import StudentApplicationsView from "../pages/viewing_open_applications/StudentApplicationsView";
import ProfessorDashboardView from "../pages/dashboard/ProfessorDashboardView";
import StudentDashboardView from "../pages/dashboard/StudentDashboardView";
import LoginPage from "../pages/auth/Login";
import Root from "./Root";
import Private from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../api/users";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route exact path="/" element={<Root />}>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/faqs" element={<FAQs />} />

        <Route
          exact
          path="student/dashboard"
          element={<StudentDashboardView />}
        />
        <Route
          exact
          path="student/apply"
          element={<StudentApplicationsView />}
        />

        <Route
          exact
          path="prof/dashboard"
          element={<ProfessorDashboardView />}
        />
        <Route
          exact
          path="prof/templates"
          element={<ApplicationTemplateView />}
        />
        <Route
          exact
          path="prof/templates/default"
          element={<DefaultApplicationFormView />}
        />
        <Route
          exact
          path="prof/templates/custom"
          element={<CustomApplicationFormView />}
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
          path="applicationtemplates/default"
          element={
            <ProtectedRoute roles={["professor"]}>
              <DefaultApplicationFormView />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="applicationtemplates/custom"
          element={<CustomApplicationFormView />}
        />

        <Route
          exact
          path="student/dashboard"
          element={<StudentDashboardView />}
        />
        <Route
          exact
          path="studentchangeapply"
          element={<DefaultApplicationFormView />}
        />
      </Route>
    </>
  )
);

export default Router;
