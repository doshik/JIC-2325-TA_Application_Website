import * as React from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getProfCoursesAction } from "../../redux/actions/courseActions";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";

const ProfDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);
  const semesters = new Set();
  courses.forEach((course) => semesters.add(course.semester));
  const [semester, setSemester] = React.useState([...semesters][0] || "");

  useEffect(() => {
    dispatch(getProfCoursesAction());
  }, [dispatch]);


  const filteredBySem = courses.filter(
    (course) =>
      course.semester === semester || semester === "" || semester === "All"
  );
  const activeCourses = filteredBySem.filter(
    (course) => course.active === true
  );
  const inactiveCourses = filteredBySem.filter(
    (course) => course.active === false
  );

  return (
    <Container fluid className="mx-0">
      {/*<Row style={styles.dropdown}>*/}
      {/*  <Col>*/}
      {/*    <Dropdown>*/}
      {/*      <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
      {/*        {semester ? "Filter: " + semester : "Filter by Semester"}*/}
      {/*      </Dropdown.Toggle>*/}
      {/*      <Dropdown.Menu>*/}
      {/*        <Dropdown.Item onClick={() => setSemester("All")}>*/}
      {/*          All*/}
      {/*        </Dropdown.Item>*/}
      {/*        <Dropdown.Item onClick={() => setSemester("Spring 2023")}>*/}
      {/*          Spring 2023*/}
      {/*        </Dropdown.Item>*/}
      {/*        <Dropdown.Item onClick={() => setSemester("Fall 2023")}>*/}
      {/*          Fall 2023*/}
      {/*        </Dropdown.Item>*/}
      {/*        <Dropdown.Item onClick={() => setSemester("Spring 2024")}>*/}
      {/*          Spring 2024*/}
      {/*        </Dropdown.Item>*/}
      {/*        <Dropdown.Item onClick={() => setSemester("Fall 2024")}>*/}
      {/*          Fall 2024*/}
      {/*        </Dropdown.Item>*/}
      {/*      </Dropdown.Menu>*/}
      {/*    </Dropdown>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Row>
        <Col>
          <h5>Semester</h5>
          {semesters.size > 0 ? (
            <>
              {Array.from(semesters).map((semester, index) => (
                <Card key={index} className="mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>{semester}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {courses.map((course) => (
                              course.semester === semester ? course.courseId + " ": ""
                          ))}
                        </Card.Subtitle>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/applications/${semester}`, {
                            state: { semester },
                          })
                        }
                      >
                        Semester Info
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <Card className="mb-2">
              <Card.Body>You have no semesters with courses.</Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      {/*<Row className="mt-2">*/}
      {/*  <Col>*/}
      {/*    <h5>Inactive</h5>*/}
      {/*    {inactiveCourses.length > 0 ? (*/}
      {/*      <>*/}
      {/*        {inactiveCourses.map((course, index) => (*/}
      {/*          <Card key={index} className="mb-2">*/}
      {/*            <Card.Body>*/}
      {/*              <div className="d-flex justify-content-between align-items-center">*/}
      {/*                <div>*/}
      {/*                  <Card.Title>{course.courseId}</Card.Title>*/}
      {/*                  <Card.Subtitle className="mb-2 text-muted">*/}
      {/*                    {course.courseTitle}*/}
      {/*                  </Card.Subtitle>*/}
      {/*                </div>*/}
      {/*                <Button*/}
      {/*                  variant="primary"*/}
      {/*                  onClick={() =>*/}
      {/*                    navigate(`/applications/${course.courseId}`, {*/}
      {/*                      state: { course },*/}
      {/*                    })*/}
      {/*                  }*/}
      {/*                >*/}
      {/*                  Course Info*/}
      {/*                </Button>*/}
      {/*              </div>*/}
      {/*            </Card.Body>*/}
      {/*          </Card>*/}
      {/*        ))}*/}
      {/*      </>*/}
      {/*    ) : (*/}
      {/*      <Card className="mb-2">*/}
      {/*        <Card.Body>You have no inactive courses.</Card.Body>*/}
      {/*      </Card>*/}
      {/*    )}*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </Container>
  );
};

export default ProfDashboard;

const styles = {
  dropdown: {
    marginBottom: "10px",
  },
};
