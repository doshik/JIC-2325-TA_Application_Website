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
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getApplicationTemplatesAction } from "../../redux/actions/applicationActions";
import { useDispatch, useSelector } from "react-redux";

import { updateCourseAction } from "../../redux/actions/courseActions";

const ProfCourseApplicationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templates = useSelector(
    (state) => state.application.applicationTemplates
  );
  const location = useLocation();
  const { course } = location.state;
  console.log(course);

  const courseId = course.courseId;
  const [isHiring, setIsHiring] = React.useState(course?.active);
  const [semester, setSemester] = React.useState("");
  const [template, setTemplate] = React.useState(
    course?.application?.name ?? ""
  );

  const handleSemesterChange = (eventKey) => {
    setSemester(eventKey);
  };

  const handleTemplateChange = (eventKey) => {
    setTemplate(eventKey);
    console.log(eventKey);
  };

  const handleSave = () => {
    const appTemplate = templates.filter((item) => item.name === template)[0]
      ._id;
    dispatch(updateCourseAction(course._id, appTemplate, isHiring));
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
      <Row className="mb-3 w-50 align-items-center">
        <Col md={4}>
          <h5>{courseId}</h5>
        </Col>
        <Col md={8}>
          <Form.Group controlId="formSemester">
            <DropdownButton
              variant="secondary"
              title={semester || "Select Semester"}
              onSelect={handleSemesterChange}
            >
              <Dropdown.Item eventKey="Fall 2021">Fall 2021</Dropdown.Item>
              <Dropdown.Item eventKey="Spring 2022">Spring 2022</Dropdown.Item>
              <Dropdown.Item eventKey="Fall 2022">Fall 2022</Dropdown.Item>
              <Dropdown.Item eventKey="Spring 2023">Spring 2023</Dropdown.Item>
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
                      <Dropdown.Item eventKey={template.name}>
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
                      value="hiring"
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
                    value={course.courseTitle}
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
      <Container fluid>
        <Row className="mt-3">
          <Col className="px-0">
            <ApplicationTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfCourseApplicationPage;
