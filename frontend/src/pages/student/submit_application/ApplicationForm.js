import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createApplicationAction } from "../../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

const ApplicationForm = (props) => {
    const { course } = props;
    const questions = course?.applicationTemplate?.questions;
    console.log(course)
    const [responses, setResponses] = useState(questions?.map(() => ""));

    // Update to manage files for multiple file inputs
    const [files, setFiles] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleResponseChange(idx, event) {
        const updatedResponses = [...responses];
        updatedResponses[idx] = event.target.value;
        setResponses(updatedResponses);
    }

    function handleFileChange(idx, event) {
        const file = event.target.files[0];
        setFiles(prevFiles => ({ ...prevFiles, [idx]: file }));
    }

    async function handleSave() {
        // TODO: adjust the `createApplicationAction` to handle multiple files as well
        dispatch(createApplicationAction(responses, course, false, files));
        navigate("/dashboard");
    }

    function handleSubmit() {
        // TODO: adjust the `createApplicationAction` to handle multiple files as well
        dispatch(createApplicationAction(responses, course, true, files));
        navigate("/dashboard");
    }
    
    return (
        <Container fluid>
            <Card className="text-center">
                <Card.Body>
                    {questions && questions.map((questionObj, idx) => {
                        console.log(questionObj.questionType)
                        if (questionObj.questionType === 'Short Answer') {
                            return (
                                <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                    <Form.Label>
                                        Question {idx + 1}: {questionObj.questionText}
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
                        } else if (questionObj.questionType === 'File Attachment') {
                            return (
                                <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                    <Form.Label>
                                        Question {idx + 1}: {questionObj.questionText}
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => handleFileChange(idx, e)}
                                    />
                                </Form.Group>
                            );
                        }
                        return null;
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
export default ApplicationForm;
