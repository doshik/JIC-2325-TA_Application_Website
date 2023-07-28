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
  Modal
} from "react-bootstrap";
import ApplicationTable from "./ApplicationTable";
import { useLocation, useNavigate } from "react-router-dom";
import { getApplicationTemplatesAction } from "../../../redux/actions/applicationTemplateActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProfCoursesAction, updateCourseAction } from "../../../redux/actions/courseActions";

const ProfCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const templates = useSelector(
    (state) => state.application_templates.applicationTemplates
  ) || [];

  const location = useLocation();
  const [semester, setSemester] = React.useState(location.state?.semester || {});
  //const { semester } = location.state || {};

  const courses = useSelector((state) => state.course.courses)?.filter(course => course.semester === semester) || [];
  useEffect(() => {
    dispatch(getProfCoursesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getApplicationTemplatesAction());
  }, [dispatch]);

  const [formChanged, setFormChanged] = React.useState(false);
  const [course, setCourse] = React.useState(() => {
    const item = localStorage.getItem("course");
    const parsedItem = JSON.parse(item);
    if (parsedItem?.semester === semester) {
      return parsedItem || courses[0] || "";
    }
    return courses[0] || "";
  });
  const [courseId, setCourseID] = React.useState(courses[0]?.courseId || "");

  const [isHiring, setIsHiring] = React.useState(course?.active);
  const [msBookingsLink, setMsBookingsLink] = React.useState(course?.msBookingsLink || "");
  const [description, setDescription] = React.useState(
    course?.description || ""
  );
  const [template, setTemplate] = React.useState(
    course?.applicationTemplate?.name ?? ""
  );
  const [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCourseChange = (eventKey) => {
    localStorage.setItem("course", JSON.stringify(courses[eventKey]));
    localStorage.setItem("courseId", JSON.stringify(courses[eventKey].courseId));
    setCourse(courses[eventKey]);
    setCourseID(courses[eventKey].courseId);
    setIsHiring(courses[eventKey]?.active);  // add this line
    setMsBookingsLink(courses[eventKey]?.msBookingsLink || "");  // add this line
    setDescription(courses[eventKey]?.description || "");  // add this line
    setTemplate(courses[eventKey]?.applicationTemplate?.name || "");  // add this line
    setFormChanged(true);
  };

  const handleMsBookingsLinkChange = (event) => {
    setMsBookingsLink(event.target.value);
    setFormChanged(true);
  };

  const handleTemplateChange = (eventKey) => {
    setTemplate(eventKey);
    setFormChanged(true);
  };

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    setFormChanged(true);
  }

  const handleHiringToggleChange = () => {
    setIsHiring(!isHiring);
    setFormChanged(true);
  };

  const handleSave = () => {
    handleOpenModal();
  };

  const handleContinue = async () => {
    const appTemplate = templates?.filter((item) => item.name === template)[0]?._id || "Default";
    await dispatch(
      updateCourseAction(course._id, appTemplate, isHiring, description, msBookingsLink)
    );
    
    // Update local storage here
    const updatedCourse = {...course, applicationTemplate: {name: template, _id: appTemplate}, active: isHiring, description, msBookingsLink};
    localStorage.setItem("course", JSON.stringify(updatedCourse));
    
    navigate("/dashboard");
    setFormChanged(false);
    handleCloseModal();
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
                return <Dropdown.Item eventKey={idx}>{course.courseId}</Dropdown.Item>
              })}
            </DropdownButton>
          </Form.Group>
        </Col>
      </Row>
      <Card className="rounded-0">
        <Card.Body>
          <Form id="course-form">
            <Row>
              <Col md={4}>
                <Form.Label>Select the template for TA applicants to this course:</Form.Label>
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
              </Col>
              <Col md={4}>
                <Form.Label>Set the hiring status for this course:</Form.Label>
                <Form.Group controlId="formHiring">
                  <ToggleButtonGroup type="checkbox" className="mb-2">
                    <ToggleButton
                      id="hiring-toggle"
                      variant={isHiring ? "success" : "danger"}
                      onChange={() => handleHiringToggleChange()}
                    >
                      {isHiring ? "Hiring" : "Not Hiring"}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group controlId="formMsBookingsLink">
                  <Form.Label>MS Bookings Link:</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Enter MS Bookings Link"
                    name="msBookingsLink"
                    value={msBookingsLink}
                    onChange={(e) => handleMsBookingsLinkChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group controlId="formCourseDescription">
                  <Form.Label>Position Description:</Form.Label>
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
            <Row>
              <Col>
                <Button variant="primary" onClick={handleSave} className="w-25" disabled={!formChanged}>
                  Save Changes
                </Button>
              </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Save</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to save these changes?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleContinue}>
                  Continue
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
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
