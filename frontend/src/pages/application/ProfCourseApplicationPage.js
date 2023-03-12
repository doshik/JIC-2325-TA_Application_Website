import * as React from "react";
import ApplicationTable from "./ApplicationTable";
import DefaultHeader from "../../components/DefaultHeader";
import { useLoaderData } from "react-router-dom";

const ProfCourseApplicationPage = () => {
  const courseId = useLoaderData();

  if (!courseId) {
    return (
      <>
        <DefaultHeader text="Course Not Found" />
        <div style={styles.container}>
          <h1>Course is either invalid or cannot be found at this time.</h1>
        </div>
      </>
    );
  }

  return (
    <div style={styles.container}>
      <DefaultHeader text={`Applications for ${courseId}`} />
      <ApplicationTable />
    </div>
  );
};

export default ProfCourseApplicationPage;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    width: "100%",
  },
};
