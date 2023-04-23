import * as React from "react";
import StudentDashboard from "./StudentDashboard";

const StudentDashboardView = () => {
  return (
    <div style={styles.container}>
      <StudentDashboard />
    </div>
  );
};

export default StudentDashboardView;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
};