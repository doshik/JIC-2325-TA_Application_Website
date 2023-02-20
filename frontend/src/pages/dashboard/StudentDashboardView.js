import * as React from "react";
import StudentDashboard from "./StudentDashboard";

const StudentDashboardView = () => {
    return (
      <div className="text-center" style={{ marginTop: "2rem"}}>
        <h1>
            Student Dashboard
        </h1>
        <StudentDashboard/>
      </div>
    );
  };

export default StudentDashboardView;