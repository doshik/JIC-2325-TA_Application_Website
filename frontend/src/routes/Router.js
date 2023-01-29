import React from "react";
import {Route, Routes, Redirect } from "react-router-dom";
import ProfCourseApplicationView from "../pages/application/ProfCourseApplicationView";
import DefaultApplicationFormView from "../pages/application_form/DefaultApplicationFormView";


const Routing = () => (
      <Routes>
        <Route exact path="/" element={<ProfCourseApplicationView/>} />
        <Route exact path="/prof/applicationtemplates/defaultform" element={<DefaultApplicationFormView/>} />
      </Routes>
  );
  
  export default Routing;