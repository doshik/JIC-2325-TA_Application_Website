import * as React from "react";
import StudentApplicationTable from "./StudentApplicationTable";
import { Button } from "react-bootstrap";

const StudentApplicationsView = () => {
  return (
    <div className="text-center" style={{ marginTop: '2rem' }}>
        <h1>Open Positions</h1>
        <StudentApplicationTable />
    </div>
  );
};

export default StudentApplicationsView;