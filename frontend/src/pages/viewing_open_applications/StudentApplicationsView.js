import * as React from "react";
import StudentApplicationTable from "./StudentApplicationTable";
import { Button } from "react-bootstrap";

const StudentApplicationsView = () => {
  return (
    <div className="text-center mt-5">
        <h1>Open Applications</h1>
        <StudentApplicationTable />
    </div>
  );
};

export default StudentApplicationsView;