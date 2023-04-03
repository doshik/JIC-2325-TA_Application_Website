import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCoursesAction } from "../../redux/actions/courseActions";
import { useEffect } from "react";

const ProfDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getCoursesAction());
  }, [dispatch]);

  const Courses = [
    {
      courseName: "CS 1332",
      progress: "Active",
      courseTitle: "Data Structures & Algorithms",
    },
    {
      courseName: "CS 2340",
      progress: "Active",
      courseTitle: "Objects and Design",
    },
    {
      courseName: "CS 4641",
      progress: "Inactive",
      courseTitle: "Machine Learning",
    },
    {
      courseName: "CS 2110",
      progress: "Inactive",
      courseTitle: "Computer Organization and Programming",
    },
  ];

  const inProgressCourses = courses.filter((course) => course.active === true);
  const submittedCourses = courses.filter((course) => course.active === false);

  return (
    <Container fluid className="mx-0">
      <Row>
        <Col>
          <h5>Active</h5>
          {inProgressCourses.map((course, index) => (
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
                    onClick={() => navigate(`/applications/${course.courseId}`)}
                  >
                    Course Info
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Inactive</h5>
          {submittedCourses.map((course, index) => (
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
                    onClick={() => navigate(`/applications/${course.courseId}`)}
                  >
                    Course Info
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfDashboard;
