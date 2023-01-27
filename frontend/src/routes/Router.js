import React from "react";
import {Route, Routes, Redirect } from "react-router-dom";
import ProfCourseApplicationView from "../pages/application/ProfCourseApplicationView";


const Routing = () => (
      <Routes>
        <Route exact path="/" element={<ProfCourseApplicationView/>} />
      </Routes>
  );
  
  export default Routing;