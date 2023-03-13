import * as React from "react";
import { Container } from "react-bootstrap";
import ApplicationTable from "./ApplicationTable";
import { useLoaderData } from "react-router-dom";

const ProfCourseApplicationPage = () => {
  const courseId = useLoaderData();

  if (!courseId) {
    return (
      <div>
        <div style={styles.header}>"Course Not Found"</div>
        <div style={styles.body}>
          Course is either invalid or cannot be found at this time.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>Applications for {courseId}</div>
      <div style={styles.body}>
        <ApplicationTable />
      </div>
    </div>
  );
};

export default ProfCourseApplicationPage;

const styles = {
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#B3A369",
    padding: "1rem",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    width: "100%",
  },
};
