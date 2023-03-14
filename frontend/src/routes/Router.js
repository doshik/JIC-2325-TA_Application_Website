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
import DashboardView from "../pages/dashboard/DashboardView";
import StudentInterviewView from "../pages/interview/StudentInterviewView";
import ProfInterviewView from "../pages/interview/ProfInterviewView";

import LoginPage from "../pages/auth/Login";
import FAQs from "../pages/faqs/FAQs";
import Root from "./Root";
import HomePage from "../pages/auth/Home";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<p>404!</p>} />

      <Route exact path="/" element={<Navigate to="/login" />} />

      {/* unprotected routes */}
      <Route exact path="/" element={<Root />}>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/faqs" element={<FAQs />} />

        {/* student professor routes go in here */}
        <Route element={<ProtectedRoute roles={["student", "professor"]} />}>
          <Route exact path="/dashboard" element={<DashboardView />} />
          <Route exact path="/home" element={<HomePage />} />
        </Route>

        {/* student routes */}
        <Route element={<ProtectedRoute roles={["student"]} />}>
          <Route path="/apply" element={<StudentApplicationsView />} />
          <Route exact path="/interviews" element={<StudentInterviewView />} />
        </Route>

        {/* professor routes */}
        <Route element={<ProtectedRoute roles={["professor"]} />}>
          <Route
            exact
            path="/applications/:courseId"
            loader={({ params }) => params.courseId}
            element={<ProfCourseApplicationPage />}
          />
          <Route
            exact
            path="/templates"
            element={<ApplicationTemplateView />}
          />
          <Route
            exact
            path="/templates/default"
            element={<DefaultApplicationFormView />}
          />
          <Route
            exact
            path="/createinterviews"
            element={<ProfInterviewView />}
          />

          <Route
            exact
            path="/course/:courseId"
            loader={({ params }) => params.courseId}
            element={<ProfCourseApplicationPage />}
          />

          <Route
            exact
            path="/course/:courseId"
            loader={({ params }) => params.courseId}
            element={<ProfCourseApplicationPage />}
          />

          <Route
            exact
            path="/templates/custom"
            element={<CustomApplicationFormView />}
          />

          <Route
            exact
            path="/course/:courseId"
            loader={({ params }) => params.courseId}
            element={<ProfCourseApplicationPage />}
          />
        </Route>

        {/* <Route exact 
          path="prof/applications/:courseId" 
          loader={({ params }) => params.courseId} 
          element={<ProfCourseApplicationPage />} 
          />
          
        <Route exact path="prof/templates" element={<ApplicationTemplateView />} />

        <Route exact path="prof/templates/default" element={<DefaultApplicationFormView />} />

        <Route exact path="prof/course/:courseId" 
          loader={({ params }) => params.courseId} 
          element={<ProfCourseApplicationPage />} 
          />

        <Route exact 
          path="prof/templates/custom" 
          element={<CustomApplicationFormView />} 
          />

        <Route exact 
          path="prof/course/:courseId" 
          loader={({ params }) => params.courseId} 
          element={<ProfCourseApplicationPage />} 
          /> */}
      </Route>
    </>
  )
);

export default Router;
