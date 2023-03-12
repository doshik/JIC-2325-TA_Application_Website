import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

const StudentDashboard = () => {
  const Courses = ["CS 1331", "CS 1332", "CS 3510", "CS 4641"];

  return (
    <Container>
      <Row xs={1} md={2}>
        {Courses.map((Course, idx) => (
          <Col>
            <Card style={{ marginTop: "15px" }}>
              <Card.Header as="h5">{Course}</Card.Header>
              <Card.Body>
                <div className="text-center">
                  <Button style={{ width: "90%" }} variant="primary">
                    Status: Pending Review
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentDashboard;
