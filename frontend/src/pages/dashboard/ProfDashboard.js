import * as React from "react";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

const ProfDashboard = () => {

  const Courses = [
    "CS 4641 A",
    "CS 4641 B",
    "CS 7641 A",
    "CS 7641 A"
  ];

    return (
      <Container style={{ width: '80vw' }}>
        <Row xs={1} md={2} lg={4}>
          {Courses.map((Course, idx) => (
            <Col>
              <Card style={{ marginTop: '15px' }}>
                <Card.Header as="h5">{Course}</Card.Header>
                <Card.Body>
                  <div className="text-center">
                    <Button style={{ width: '90%' }} variant="primary">View Applicants</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
};

export default ProfDashboard;