import * as React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "./Root";
import ProtectedRoute from "./ProtectedRoute";

// General Pages
import LoginPage from "../pages/auth/Login";
import HomePage from "../pages/auth/Home";
import FAQs from "../pages/faqs/FAQs";
import DashboardView from "../pages/dashboard/DashboardView";
import Error from "../pages/error/Error";

// Professor View
import ProfCoursePage from "../pages/professor/course_page/ProfCoursePage";
import ApplicationTemplateView from "../pages/professor/templates/ApplicationTemplateView";
import DefaultFormView from "../pages/professor/application_template_forms/DefaultFormView";
import CustomFormView from "../pages/professor/application_template_forms/CustomFormView";
import EditApplicationFormView from "../pages/professor/application_template_forms/EditApplicationFormView";
import ProfInterviewView from "../pages/professor/interview/ProfInterviewView";
import ViewApplication from "../pages/professor/view_application/ApplicationStatus"

// Student View
import StudentApplicationsView from "../pages/student/viewing_open_applications/StudentApplicationsView";
import EditApplicationView from "../pages/student/submit_application/EditApplicationView";
import StudentInterviewView from "../pages/student/interview/StudentInterviewView";
import SubmitApplicationView from "../pages/student/submit_application/SubmitApplicationView";
import ApplicationStatus from "../pages/student/application_status/ApplicationStatus"

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* unprotected routes */}
      <Route exact path="/" element={<Root />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Error />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/faqs" element={<FAQs />} />

        {/* student professor routes go in here */}
        <Route element={<ProtectedRoute roles={["student", "professor", "TA"]} />}>
          <Route exact path="/dashboard" element={<DashboardView />} />
          <Route exact path="/home" element={<HomePage />} />
        </Route>

        {/* student routes */}
        <Route element={<ProtectedRoute roles={["student"]} />}>
          <Route exact path="/apply" element={<StudentApplicationsView />} />

          <Route
            exact
            path="/submitapplication"
            element={<SubmitApplicationView />}
          />

          <Route 
            exact 
            path="/editapplication" 
            element={<EditApplicationView />} 
          />

          <Route 
            exact 
            path="/applicationstatus" 
            element={<ApplicationStatus />} 
          />

          <Route exact path="/interviews" element={<StudentInterviewView />} />
        </Route>

        {/* professor routes */}
        <Route element={<ProtectedRoute roles={["professor", "TA"]} />}>
          <Route
            exact
            path="/applications/:courseId"
            loader={({ params }) => params.courseId}
            element={<ProfCoursePage />}
          />
          <Route 
            exact 
            path="/viewapplication" 
            element={<ViewApplication />} 
          />
          <Route
            exact
            path="/templates"
            element={<ApplicationTemplateView />}
          />
          <Route
            exact
            path="/templates/default"
            element={<DefaultFormView />}
          />
          <Route
            exact
            path="/templates/custom"
            element={<CustomFormView />}
          />
          <Route
            exact
            path="/templates/edit"
            element={<EditApplicationFormView />}
          />

          <Route
            exact
            path="/interviewscheduling"
            element={<ProfInterviewView />}
          />
        </Route>
      </Route>
    </>
  )
);

export default Router;
