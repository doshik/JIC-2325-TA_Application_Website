import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateApplicationAction } from "../../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

const EditApplicationForm = (props) => {
    const { application } = props;
    const questions = application?.applicationTemplate?.questions;
    const [responses, setResponses] = useState(application.responses || questions?.map(() => ""));
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
        dispatch(updateApplicationAction(application._id, responses, false));

        for (const [idx, file] of Object.entries(files)) {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch(`/upload/${idx}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    // Handle error
                }
            }
        }

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
                                        className="w-75"
                                        onChange={(e) => handleFileChange(idx, e)}
                                    />
                                </Form.Group>
                            );
                        }
                        return null;
                    })}

                   // Todo: implement multiselect

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
