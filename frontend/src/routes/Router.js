import React from "react";
import {Route, Routes, Redirect } from "react-router-dom";
import ProfCourseApplicationView from "../pages/application/ProfCourseApplicationView";
import StudentApplicationsView from "../pages/viewing_open_applications/StudentApplicationsView";


const Routing = () => (
      <Routes>
        <Route exact path="/" element={<ProfCourseApplicationView/>} />
        <Route exact path= "/student/openapplications" element={<StudentApplicationsView/>} />
      </Routes>
  );
  
  export default Routing;