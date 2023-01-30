import * as React from "react";
import ProfDashboard from "./ProfDashboard";

const ProfessorDashboardView = () => {
    return (
      <div style={styles.container}>
        <h1>
            Professor Dashboard
        </h1>
        <ProfDashboard/>
        <ProfDashboard/>
        <ProfDashboard/>
        <ProfDashboard/>
      </div>
    );
  };

export default ProfessorDashboardView;

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "flex-start",
      height: "100vh",
    },
  };