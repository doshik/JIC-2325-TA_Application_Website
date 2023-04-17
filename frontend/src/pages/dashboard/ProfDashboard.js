import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProfCoursesAction } from "../../redux/actions/courseActions";
import { useEffect } from "react";

const ProfDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getProfCoursesAction());
  }, [dispatch]);

  const activeCourses = courses.filter((course) => course.active === true);
  const inactiveCourses = courses.filter((course) => course.active === false);

  return (
    <Container fluid className="mx-0">
      <Row>
        <Col>
          <h5>Active</h5>
          {activeCourses.length > 0 ? (
            <>
              {activeCourses.map((course, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>{course.courseId}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {course.courseTitle}
                        </Card.Subtitle>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/applications/${course.courseId}`, {
                            state: { course },
                          })
                        }
                      >
                        Course Info
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <Card className="mb-2">
              <Card.Body>
                  You have no active courses.
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <h5>Inactive</h5>
          {inactiveCourses.length > 0 ? (
            <>
              {inactiveCourses.map((course, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>{course.courseId}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {course.courseTitle}
                        </Card.Subtitle>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/applications/${course.courseId}`, {
                            state: { course },
                          })
                        }
                      >
                        Course Info
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <Card className="mb-2">
              <Card.Body>
                  You have no inactive courses.
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfDashboard;
