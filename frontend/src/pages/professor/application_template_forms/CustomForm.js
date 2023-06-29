import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createApplicationTemplateAction,
  updateApplicationTemplateAction,
} from "../../../redux/actions/applicationTemplateActions";

function CustomForm({ template }) {
  const [name, setName] = useState(template?.name ?? "");
  const [questions, setQuestions] = useState(
    template?.questions ?? [{ questionText: null, questionType: 'Short Answer', options: [] }]  // fields renamed and options added
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddField() {
    const fields = [...questions];
    fields.push({ questionText: null, questionType: 'Short Answer', options: [] }); // fields renamed and options added
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

  function handleQuestionChange(i, event) {
    const fields = [...questions];
    fields[i].questionText = event.target.value; // renamed to questionText
    setQuestions(fields);
  }

  function handleTypeChange(i, event) {
    const fields = [...questions];
    fields[i].QuestionType = event.target.value; // renamed to QuestionType
    setQuestions(fields);
  }

  function handleSubmit(event) {
    if (template) {
      dispatch(updateApplicationTemplateAction(template._id, name, questions));
    } else {
      dispatch(createApplicationTemplateAction(name, questions));
    }
    navigate("/templates");
  }

  return (
    <Container fluid>
      <Card className="text-center">
        <Card.Body>
          <div>
            <Form.Group as={Row} className="mb-5 justify-content-center">
              <Form.Label column sm={2} className="text-right">
                <strong>Application Name: </strong>
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  as="textarea"
                  onChange={(e) => handleNameChange(e)}
                  rows="1"
                  value={name}
                />
              </Col>
            </Form.Group>
          </div>
          {questions.map((field, idx) => {
            return (
              <Form.Group key={idx} as={Row} className="my-2">
                <Form.Label column xs={2}>
                  Question {idx + 1}:
                </Form.Label>
                <Col xs={7}>
                  <Form.Control
                    as="textarea"
                    value={field.question || ""}
                    onChange={(e) => handleQuestionChange(idx, e)}
                    rows="1"
                  />
                </Col>
                <Col xs={2}>
                  <Form.Control
                    as="select"
                    value={field.type}
                    onChange={(e) => handleTypeChange(idx, e)}
                  >
                    <option>Short Answer</option>
                    <option>File Attachment</option>
                    <option>MultiSelect</option>
                  </Form.Control>
                </Col>
                <Col xs={1} className="d-flex align-items-center">
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
          <Row className="mt-4">
            <Col className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => handleAddField()}>
                Add Question
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <Button variant="success" onClick={() => handleSubmit()}>
            Save Custom Application
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default CustomForm;
