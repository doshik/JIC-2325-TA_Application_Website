import * as React from "react";
import ApplicationTemplatesTable from "./ApplicationTemplatesTable";
import { Button, Row, Col, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ApplicationTemplateView = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <ApplicationTemplatesTable />
      <Button
        variant="success"
        onClick={() => navigate("/prof/templates/custom")}
      >
        Create New
      </Button>
    </div>
  );
};

export default ApplicationTemplateView;
