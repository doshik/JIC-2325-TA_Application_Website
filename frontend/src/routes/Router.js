import React from "react";
import {Route, Routes, Redirect } from "react-router-dom";
import ProfCourseApplicationView from "../pages/application/ProfCourseApplicationView";
import ApplicationTemplateView from "../pages/application_templates/ApplicationTemplateView";



const Routing = () => (
      <Routes>
        <Route exact path="/" element={<ProfCourseApplicationView/>} />
        <Route exact path="/prof/applicationtemplates" element={<ApplicationTemplateView/>} />
      </Routes>
  );
  
  export default Routing;