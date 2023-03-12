import * as React from "react";
import ApplicationTemplatesTable from "./ApplicationTemplatesTable";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ApplicationTemplateView = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-5">
      <h1>Application Templates</h1>
      <ApplicationTemplatesTable />
      <Row>
        <Col md={{ span: 1, offset: 5 }}>
          <Button variant="secondary">Go Back</Button>
        </Col>
        <Col md={{ span: 1 }}>
          <Button
            variant="success"
            onClick={() => navigate("/user/applicationtemplates/custom")}
          >
            Create New Template
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationTemplateView;
