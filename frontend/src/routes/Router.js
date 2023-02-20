import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import ProfCourseApplicationPage from "../pages/application/ProfCourseApplicationPage";
import DefaultApplicationFormView from "../pages/application_form/DefaultApplicationFormView";
import ApplicationTemplateView from "../pages/application_templates/ApplicationTemplateView";
import StudentApplicationsView from "../pages/viewing_open_applications/StudentApplicationsView";
import ProfessorDashboardView from "../pages/dashboard/ProfessorDashboardView";
import StudentDashboardView from "../pages/dashboard/StudentDashboardView";
import LoginPage from "../pages/auth/Login";
import Root from "./Root";
import Private from "./PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="/login" element={<LoginPage />}/>

        <Route path="/home" element={<Private Component={Root} roles={['student', 'professor']}/>}/>
        <Route path="/studentdashboard" element={<Private Component={StudentDashboardView} roles={['student']}/>} />
        <Route path="/apply" element={<StudentApplicationsView />} />
          
        <Route path="/professordashboard" element={<Private Component={ProfessorDashboardView} roles={['professor']}/>} />
        <Route path="/applications" element={<ApplicationTemplateView />} />
        <Route path="applications/default" element={<DefaultApplicationFormView />} />
        <Route
          exact
          path="prof/course/:courseId"
          loader={({ params }) => {
            return params.courseId;
          }}
          element={<ProfCourseApplicationPage />}
        />

      </Routes>
    </BrowserRouter>
  )
    }

export default Router;
