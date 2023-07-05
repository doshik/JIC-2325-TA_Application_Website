import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
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
            "options": questions[idx].options,
            "filename": file.name
        };
        setFiles(prevFiles => ({ ...prevFiles, [idx]: file }));
        setResponses(updatedResponses);

        console.log(updatedResponses)
    }

    function handleCheckboxChange(idx, i, event) {
        const updatedResponses = [...responses];
        if (updatedResponses[idx] === "") {
            updatedResponses[idx] = [];
        }
        updatedResponses[idx][i] = event.target.checked;
        setResponses(updatedResponses);
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
    console.log("A")
    useEffect(() => {
        const updatedResponses = []
        let i = 0;
        for(let question in questions) {
            updatedResponses[i] = {
                "questionText": questions[question].questionText,
                "questionType": questions[question].questionType,
                "options": questions[question].options,
                "value": ""
            };
            i ++;
        }
        setResponses(updatedResponses);

    }, [questions])
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
                                    <Form.Control
                                        type="file"
                                        className="w-75"
                                        onChange={(e) => handleFileChange(idx, e)}
                                    />
                                </Form.Group>
                            );
                        } else if (questionObj.questionType === 'MultiSelect') {
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
                                                        id={idx + "Option" + i}
                                                        rows="1"
                                                        defaultChecked={false}
                                                        onChange={(e) => handleCheckboxChange(idx, i, e)}
                                                    />
                                                </Col>
                                                <Col xs={4} className="text-start">
                                                    <Form.Label htmlFor={idx + "Option" + i}>
                                                        {option}
                                                    </Form.Label>
                                                </Col>
                                            </Form.Group>
                                        )
                                    })}
                                </Form.Group>
                            )
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
