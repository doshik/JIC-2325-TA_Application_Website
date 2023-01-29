import * as React from "react";
import ApplicationTemplatesTable from "./ApplicationTemplatesTable";
import { Button } from "react-bootstrap";


const ApplicationTemplateView = () => {
  return (
    <div className="text-center mt-5">
        <h1>Application Templates</h1>
        <ApplicationTemplatesTable />
        <Button>Create New</Button>
    </div>
  );
};

export default ApplicationTemplateView;