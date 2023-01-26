import * as React from "react";
import ApplicationTable from "../../components/application/ApplicationTable";

const ProfCourseApplicationView = () => {
  return (
    <div style={styles.container}>
      <ApplicationTable />
    </div>
  );
};

export default ProfCourseApplicationView;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
  },
};
