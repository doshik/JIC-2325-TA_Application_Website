import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompletedApplication(props) {
  const { application } = props;

  const questions = application?.applicationTemplate?.questions;
  const responses = application?.responses;

  return (
    <Container fluid className="px-0">
      <Card className="text-center mb-2">
        <Card.Body>
          {questions &&
            questions.map((questionObj, idx) => {
                if (questionObj.questionType !== 'MultiSelect') {
                  return (
                    <Form.Group
                      key={idx}
                      as={Row}
                      className="mb-5 d-flex justify-content-center"
                    >
                      <Form.Label>
                        Question {idx + 1}: {questionObj.questionText}
                      </Form.Label>

                      <Form.Control
                        as="textarea"
                        className="w-75"
                        value={responses[idx] || ""}
                        rows="1"
                        readOnly
                        disabled
                      />
                    </Form.Group>
                  );
                } else {
                    return (
                        <Form.Group key={idx} as={Row} className="my-2">
                            <Form.Label>
                                Question {idx + 1}: {questionObj.questionText}
                            </Form.Label>
                            {questionObj.options.map((option, i) => {
                                return (
                                    <Form.Group key={i} as={Row} className="mb-2 justify-content-center">
                                        <Col xs={1}>
                                            <Form.Check
                                                type="checkbox"
                                                className="w-75"
                                                defaultChecked={responses[idx][i]}
                                                rows="1"
                                                readOnly
                                                disabled
                                            />
                                        </Col>
                                        <Col xs={4} className="text-start">
                                            <Form.Label>
                                                {option}
                                            </Form.Label>
                                        </Col>
                                    </Form.Group>
                                );
                            })}
                        </Form.Group>
                    );
                }
            })}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default CompletedApplication;
