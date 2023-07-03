import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateApplicationAction } from "../../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

const EditApplicationForm = (props) => {
    const { application } = props;
    const questions = application?.applicationTemplate?.questions;
    const [responses, setResponses] = useState(questions?.map((q, idx) => ({
        "questionText": q.questionText,
        "questionType": q.questionType,
        "options": q.options,
        "value": application.responses[idx] || ""
    })));
    const [files, setFiles] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleResponseChange(idx, event) {
        const updatedResponses = [...responses];
        updatedResponses[idx] = {
            "value": event.target.value,
            "questionText": questions[idx].questionText,
            "questionType": questions[idx].questionType,
            "options": questions[idx].options
        };
        setResponses(updatedResponses);
    }

    function handleFileChange(idx, event) {
        const file = event.target.files[0];
        const updatedResponses = [...responses];
        updatedResponses[idx] = {
            "questionText": questions[idx].questionText,
            "questionType": questions[idx].questionType,
            "filename": file.name,
            "options": questions[idx].options
        };
        setFiles(prevFiles => ({ ...prevFiles, [idx]: file }));
        setResponses(updatedResponses);
    }

    async function handleSave() {
        dispatch(updateApplicationAction(application._id, responses, false, files));
        navigate("/dashboard");
    }

    function handleSubmit() {
        dispatch(updateApplicationAction(application._id, responses, true, files));
        navigate("/dashboard");
    }

    useEffect(() => {
        setResponses(application.responses);
    }, [application])

    return (
        <Container fluid>
            <Card className="text-center">
                <Card.Body>
                    {responses && responses.map((questionObj, idx) => {
                        if (questionObj.questionType === 'Short Answer') {
                            return (
                                <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                    <Form.Label>
                                        Question {idx + 1}: {questionObj.questionText}
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="w-75"
                                        value={responses[idx].value || ""}
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
                                    {questionObj.value ? <p><b>Attached file: </b> <a href={`http://127.0.0.1:5001/application/file/download/${questionObj.value}`}>Download File</a></p> : ""}
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
