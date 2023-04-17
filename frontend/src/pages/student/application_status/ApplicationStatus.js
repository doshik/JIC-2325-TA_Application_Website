import * as React from "react";
import {
  Row,
  Col,
  Card,
  Container,
  ProgressBar,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import { useLoaderData } from "react-router-dom";
import CompletedApplication from "./CompletedApplication"


const ApplicationStatus = () => {
  const courseId = useLoaderData();
  const [isHiring, setIsHiring] = React.useState(false);
  const [semester, setSemester] = React.useState("");
  const [template, setTemplate] = React.useState("");
  const status = "submitted" 

  const handleSemesterChange = (eventKey) => {
    setSemester(eventKey);
  };

  const handleTemplateChange = (eventKey) => {
    setTemplate(eventKey);
  };

  const handleSave = () => {
    const form = document.getElementById("course-form");
    const formData = new FormData(form);
    // Add logic here to handle form data submission
  };

  if (!courseId) {
    return (
      <Container className="text-center mt-5">
        <h5 className="font-weight-bold my-4">This course does not exist.</h5>
        <h5 className="text-muted my-4">Please go back to the dashboard.</h5>
      </Container>
    );
  }

  return (
    <div>      
      <Row className="mb-3 w-50 align-items-center">
        <Col md={4}>
          <h5>{courseId}</h5>
        </Col>
      </Row>
        <Card className="mb-3">
            <Card.Header>Status</Card.Header>
            <Card.Body>
                <ProgressBar>
                  <ProgressBar
                      striped
                      variant={status === 'Submitted' ? 'primary' : 'dark'}
                      now={25}
                      key={1}
                      label="Submitted"
                  />
                  <ProgressBar
                      striped
                      variant={status === 'Interview' ? 'warning' : 'dark'}
                      now={25}
                      key={2}
                      label="Interview"
                  />
                  <ProgressBar
                      striped
                      variant={status === 'Hired' ? 'success' : 'dark'}
                      now={25}
                      key={3}
                      label="Hired"
                  />
                  <ProgressBar
                      striped
                      variant={status === 'Denied' ? 'danger' : 'dark'}
                      now={25}
                      key={4}
                      label="Denied"
                  />
                </ProgressBar>
            </Card.Body>
        </Card>
        
        <CompletedApplication />

    </div>
  );
};

export default ApplicationStatus;


