import * as React from "react";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  function handleOpenApplicationsClick() {
    navigate('/user/student/openapplications');
  }

  const Courses = [
    "CS 1331",
    "CS 1332",
    "CS 3510",
    "CS 4641"
  ];

    return (
      <div>
        <Container style={{ width: '80vw' }}>
          <Row xs={1} md={2} lg={4}>
            {Courses.map((Course, idx) => (
              <Col>
                <Card style={{ marginTop: '2rem' }}>
                  <Card.Header as="h5">{Course}</Card.Header>
                  <Card.Body>
                    <div className="text-center">
                      <Button style={{ width: '90%' }} variant="primary">View Status</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <div className="d-flex justify-content-center" style={{ marginTop: '2rem' }}>
          <Button variant="success" size="lg" onClick={handleOpenApplicationsClick}>View Open Positions</Button>
        </div>
      </div>
    );
};

export default StudentDashboard;