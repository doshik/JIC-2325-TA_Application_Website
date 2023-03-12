import * as React from "react";
import ProfDashboard from "./ProfDashboard";

const ProfessorDashboardView = () => {
  return (
    <div style={styles.container}>
      <ProfDashboard />
    </div>
  );
};

export default ProfessorDashboardView;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
  },
};
