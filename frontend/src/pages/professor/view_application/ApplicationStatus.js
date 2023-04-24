import * as React from "react";
import {
  Row,
  Col,
  Card,
  Container,
  ProgressBar,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CompletedApplication from "./CompletedApplication"

const ApplicationStatus = () => {
  const location = useLocation();
  const application = location.state.application;

  if (!application) {
    return (
      <Container className="text-center mt-5">
        <h5 className="font-weight-bold my-4">This page does not exist.</h5>
        <h5 className="text-muted my-4">Please go back to the dashboard.</h5>
      </Container>
    );
  }

  return (
    <div>      
      <Row className="mb-3 w-50 align-items-center">
        <Col md={4}>
          <h5>{application.course.courseId}</h5>
        </Col>
      </Row>
        <Card className="mb-3">
            <Card.Header>Status</Card.Header>
            <Card.Body>
                <ProgressBar>
                  <ProgressBar
                      striped
                      variant={application.status === 'Submitted' ? 'primary' : 'dark'}
                      now={25}
                      key={1}
                      label="Submitted"
                  />
                  <ProgressBar
                      striped
                      variant={application.status === 'Interview' ? 'warning' : 'dark'}
                      now={25}
                      key={2}
                      label="Interview"
                  />
                  <ProgressBar
                      striped
                      variant={application.status === 'Hired' ? 'success' : 'dark'}
                      now={25}
                      key={3}
                      label="Hired"
                  />
                  <ProgressBar
                      striped
                      variant={application.status === 'Denied' ? 'danger' : 'dark'}
                      now={25}
                      key={4}
                      label="Denied"
                  />
                </ProgressBar>
            </Card.Body>
        </Card>
        
        <CompletedApplication application={application}/>
        
    </div>
  );
};

export default ApplicationStatus;