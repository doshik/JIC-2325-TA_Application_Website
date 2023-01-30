import * as React from "react";
import ApplicationTemplatesTable from "./ApplicationTemplatesTable";
import { Button, Row, Col } from "react-bootstrap";


const ApplicationTemplateView = () => {
  return (
    <div className="text-center mt-5">
        <h1>Application Templates</h1>
        <ApplicationTemplatesTable />
        <Row>
          <Col md={{ span: 1, offset: 5 }}>
            <Button variant="secondary">Go Back</Button>
          </Col>
          <Col md={{ span: 1 }}>
            <Button variant="success">Create New</Button>
          </Col>
        </Row>
    </div>
  );
};

export default ApplicationTemplateView;