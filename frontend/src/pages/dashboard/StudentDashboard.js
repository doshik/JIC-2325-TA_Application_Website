import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import StudentSchedulerWrapper from "../interview/StudentSchedulerWrapper";

const StudentDashboard = () => {
  const Courses = [
    { courseName: 'CS 1332', progress: "In Progress", professor: "Olufisayo Omojokun" },
    { courseName: 'CS 2340', progress: "In Progress", professor: "Aibek Musaev" },
    { courseName: 'CS 4641', progress: "Submitted", professor: "Mahdi Roozbahani" },
    { courseName: 'CS 2110', progress: "Submitted", professor: "Caleb Southern"}
  ];

  const inProgressCourses = Courses.filter(course => course.progress === "In Progress");
  const submittedCourses = Courses.filter(course => course.progress === "Submitted");

  return (
    <Container fluid className="mx-0">
      <Row>
        <Col>
          <h5>In Progress</h5>
          {inProgressCourses.map((course, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>{course.courseName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{course.professor}</Card.Subtitle>
                  </div>
                  <Button variant="primary" href={`submit/${course.courseName}`}>View/Edit</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Submitted</h5>
          {submittedCourses.map((course, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>{course.courseName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{course.professor}</Card.Subtitle>
                  </div>
                  <Button variant="primary" href={`status/${course.courseName}`}>View Submission</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
