import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getStudentApplicationsAction } from "../../redux/actions/applicationActions";
import { useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application.applications);

  useEffect(() => {
    dispatch(getStudentApplicationsAction());
  }, [dispatch]);

  const inProgressApplications = applications.filter(
    (application) => !application.submitted
  );
  const submittedApplications = applications.filter(
    (application) => application.submitted
  );

  return (
    <Container fluid className="mx-0">
      <Row>
        <Col>
          <h5>In Progress</h5>
          {inProgressApplications.length > 0 ? (
            <>
              {inProgressApplications.map((application, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>
                          {application.course.courseId} - {application.course.courseTitle}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {application.professor.name}
                        </Card.Subtitle>
                      </div>
                      <Button
                        variant="primary"
                        href={`submit/${application.course.courseTitle}`}
                      >
                        View/Edit
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <Card className="mb-2">
              <Card.Body>You have no in-progress applications.</Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <h5>Submitted</h5>
          {submittedApplications.length > 0 ? (
            <>
              {submittedApplications.map((application, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>
                          {application.course.courseId} - {application.course.courseTitle}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {application.professor.name}
                        </Card.Subtitle>
                      </div>
                      <Button
                        variant="primary"
                        href={`status/${application.course.courseTitle}`}
                      >
                        View Submission
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <Card className="mb-2">
              <Card.Body>You have no submitted applications.</Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
