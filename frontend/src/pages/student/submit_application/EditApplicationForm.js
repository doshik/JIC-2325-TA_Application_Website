import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateApplicationAction } from "../../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

const EditApplicationForm = (props) => {
    const { application } = props;
    const questions = application?.applicationTemplate?.questions;
    const [responses, setResponses] = useState(application.responses || questions?.map(() => ""));
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleResponseChange(idx, event) {
        const updatedResponses = [...responses];
        updatedResponses[idx] = event.target.value;
        setResponses(updatedResponses);
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file && !['application/pdf', 'image/png'].includes(file.type)) {
            setFileError('File must be a PDF or PNG.');
            setFile(null);
        } else {
            setFileError('');
            setFile(file);
        }
    }

    async function handleSave() {
        dispatch(updateApplicationAction(application._id, responses, false));

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // Handle error
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
                    <Form.Group>
                        <Form.File
                            id="application-file"
                            label="Attach a file"
                            onChange={handleFileChange}
                            accept=".pdf, .png"
                            custom
                        />
                        <Form.Control.Feedback type="invalid" style={{display: fileError ? 'block' : 'none'}}>
                            {fileError}
                        </Form.Control.Feedback>
                    </Form.Group>
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
