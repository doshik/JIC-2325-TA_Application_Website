import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createApplicationTemplateAction } from "../../../redux/actions/applicationTemplateActions";
import { useNavigate } from "react-router-dom";

function ApplicationForm() {
    const [responses, setResponses] = useState([{ question: null }]);

    const questions = [
        "Why do you want to be a TA?",
        "Do you have any additional information you would like to provide? If yes, write below."
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleResponseChange(event) {
        setResponses(event.target.value);
      }

    function handleSubmit(event) {
        console.log(responses);
        // dispatch(createApplicationTemplateAction(name, questions));
        navigate("/dashboard");
    }

    return (
        <Container fluid>
            <Card className="text-center">
                <Card.Body>
                    {questions.map((question, idx) => {
                        return (
                            <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                <Form.Label>
                                    Question {idx + 1}: {question}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="w-75"
                                    value={question.response || ""}
                                    onChange={(e) => handleResponseChange(idx, e)}
                                    rows="1"
                                />
                            </Form.Group>
                        );
                    })}
                </Card.Body>
            </Card>
            <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                    <Button variant="success" onClick={() => handleSubmit()}>
                        Submit Application
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
export default ApplicationForm;