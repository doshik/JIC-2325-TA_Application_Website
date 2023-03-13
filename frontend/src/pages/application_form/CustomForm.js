import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createApplicationTemplateAction } from "../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

function CustomForm() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([{ question: null }]);
  const [pageNumbers, setPageNumbers] = useState([{ value: null }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddField() {
    const fields = [...questions];
    fields.push({ question: null });
    setQuestions(fields);
  }

  function handleRemoveField(i) {
    const fields = [...questions];
    fields.splice(i, 1);
    setQuestions(fields);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleChange(i, event) {
    const fields = [...questions];
    fields[i].question = event.target.value;
    setQuestions(fields);
  }

  function handleSubmit(event) {
    console.log(questions);
    dispatch(createApplicationTemplateAction(name, questions));
    navigate("/user/prof/applicationtemplates");
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card style={{ marginTop: "5px" }}>
            <Card.Body>
              <div className="text-center">
                <Form.Group as={Row} className="mb-4">
                    <Col></Col>
                    <Col>
                      <Form.Label><strong>Application Name: </strong></Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        as="textarea"
                        onChange={(e) => handleNameChange(e)}
                        rows="1"
                      />
                    </Col>
                    <Col></Col>
                </Form.Group>
              </div>
              {questions.map((field, idx) => {
                return (
                  <Form.Group key={idx} as={Row}>
                    <Form.Label column xs={2}>
                      Question {idx + 1}:
                    </Form.Label>
                    <Col xs={8}>
                      <Form.Control
                        as="textarea"
                        value={field.question || ""}
                        onChange={(e) => handleChange(idx, e)}
                        rows="1"
                      />
                    </Col>
                    <Col xs={2} className="d-flex align-items-center">
                      {questions.length > 1 && (
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleRemoveField(idx);
                          }}
                        >
                          X
                        </Button>
                      )}
                    </Col>
                  </Form.Group>
                );
              })}
              <Row className="mt-4 mb-3">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="mr-3"
                    onClick={() => handleAddField()}
                  >
                    Add Question
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleSubmit()}
                  >
                    Save Custom Application
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default CustomForm;