import * as React from "react";
import StudentApplicationTable from "./StudentApplicationTable";
import { Button } from "react-bootstrap";

const StudentApplicationsView = () => {
  return (
    <div className="text-center">
      <StudentApplicationTable />
    </div>
  );
};

export default StudentApplicationsView;
