import * as React from "react";
import {
  Route,
  Navigate,
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
import LoginPage from "../pages/login/Login";
import FAQs from "../pages/faqs/FAQs";
import Root from "./Root";

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
      </Route>
    </>
  )
);

export default Router;
