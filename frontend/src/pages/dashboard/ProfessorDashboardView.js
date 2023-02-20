import * as React from "react";
import ProfDashboard from "./ProfDashboard";

const ProfessorDashboardView = () => {
  return (
    <div className="text-center" style={{ marginTop: "2rem"}}>
      <h1>
          Professor Dashboard
      </h1>
      <ProfDashboard/>
    </div>
  );
};

export default ProfessorDashboardView;