import * as React from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import ApplicationTable from "./ApplicationTable";
import { useLocation, useNavigate } from "react-router-dom";
import { getApplicationTemplatesAction } from "../../../redux/actions/applicationTemplateActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getProfCoursesAction, updateCourseAction} from "../../../redux/actions/courseActions";

const ProfCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templates = useSelector(
    (state) => state.application_templates.applicationTemplates
  );

  const location = useLocation();
  const { semester } = location.state;

  const courses = useSelector((state) => state.course.courses).filter(course => course.semester === semester);
  useEffect(() => {
    dispatch(getProfCoursesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getApplicationTemplatesAction());
  }, [dispatch]);

  const [course, setCourse] = React.useState( () => {
    const item = localStorage.getItem("course")
    const parsedItem = JSON.parse(item);
    if (parsedItem.semester === semester) {
      return parsedItem || courses[0] || "";
    }
    return courses[0] || "";
  });
  const [courseId, setCourseID] = React.useState(courses[0].courseId || "");

  const [isHiring, setIsHiring] = React.useState(course?.active);
  const [description, setDescription] = React.useState(
    course?.description || ""
  );
  const [template, setTemplate] = React.useState(
    course?.applicationTemplate?.name ?? ""
  );

  const handleCourseChange = (eventKey) => {
    localStorage.setItem("course",JSON.stringify(courses[eventKey]))
    localStorage.setItem("courseId",JSON.stringify(courses[eventKey].courseId))
    setCourse(courses[eventKey]);
    setCourseID(courses[eventKey].courseId);
  };

  const handleTemplateChange = (eventKey) => {
    setTemplate(eventKey);
  };

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  const handleSave = () => {
    const appTemplate =
      templates?.filter((item) => item.name === template)[0]._id || "Default";
    dispatch(
      updateCourseAction(course._id, appTemplate, isHiring, description)
    );
    navigate("/dashboard");
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
      <Row className="mb-3 w-25 align-items-center">
        <Col md={5}>
          <h5>{semester}</h5>
        </Col>
        <Col md={7}>
          <Form.Group controlId="formSemester">
            <DropdownButton
              variant="dark"
              title={course.courseId || "Select Course"}
              onSelect={handleCourseChange}
              default="CS 1331"
            >
              {courses.map((course, idx) => {
                return <Dropdown.Item eventKey={idx}>{course.courseId}</Dropdown.Item>})}
            </DropdownButton>
          </Form.Group>
        </Col>
      </Row>
      <Card className="rounded-0">
        <Card.Body>
          <Form id="course-form">
            <Row>
              <Col md={6}>
                <Form.Group controlId="formTemplate">
                  <DropdownButton
                    variant="info"
                    className="mb-3"
                    title={template || "Select Application Template"}
                    onSelect={handleTemplateChange}
                  >
                    {templates.map((template) => (
                      <Dropdown.Item
                        key={template._id}
                        eventKey={template.name}
                      >
                        {template.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
                <Form.Group controlId="formHiring">
                  <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton
                      id="hiring-toggle"
                      variant={isHiring ? "success" : "danger"}
                      onChange={() => setIsHiring(!isHiring)}
                    >
                      {isHiring ? "Hiring" : "Not Hiring"}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCourseDescription">
                  <Form.Label>Course Description:</Form.Label>
                  <Form.Control
                    className="mb-3"
                    as="textarea"
                    rows={3}
                    placeholder="Enter course description"
                    name="courseDescription"
                    value={description}
                    onChange={(e) => handleDescriptionChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleSave} className="w-25">
                Save
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {course.active ? (
        <Container fluid>
          <Row className="mt-3">
            <Col className="px-0">
              <ApplicationTable course={course} semester={semester} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Card className="mt-3 text-center">
          <Card.Body>
            <Card.Text>This course is not active.</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ProfCoursePage;
