import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateApplicationAction } from "../../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

const EditApplicationForm = (props) => {
    const { application } = props;
    const questions = application?.applicationTemplate?.questions;
    const [responses, setResponses] = useState(application.responses || questions?.map(() => ""));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleResponseChange(idx, event) {
        const updatedResponses = [...responses];
        updatedResponses[idx] = event.target.value;
        setResponses(updatedResponses);
    }

    function handleSave() {
        dispatch(updateApplicationAction(application._id, responses, false));
        navigate("/dashboard");
    }

    function handleSubmit() {
        dispatch(updateApplicationAction(application._id, responses, true));
        navigate("/dashboard");
    }

    return (
        <Container fluid>
            <Card className="text-center">
                <Card.Body>
                    {questions && questions.map((questionObj, idx) => {
                        return (
                            <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                <Form.Label>
                                    Question {idx + 1}: {questionObj.question}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="w-75"
                                    value={responses[idx] || ""}
                                    onChange={(e) => handleResponseChange(idx, e)}
                                    rows="1"
                                />
                            </Form.Group>
                        );
                    })}
                </Card.Body>
            </Card>
            <Row className="my-4 w-25 mx-auto">
                <Col className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={() => handleSave()}>
                        Save Application
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button variant="success" onClick={() => handleSubmit()}>
                        Submit Application
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
export default EditApplicationForm;