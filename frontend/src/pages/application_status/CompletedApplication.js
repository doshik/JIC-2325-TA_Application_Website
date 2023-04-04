import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createApplicationTemplateAction } from "../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

function ApplicationForm() {
    const questions = [
        "Why do you want to be a TA?",
        "Do you have any additional information you would like to provide? If yes, write below."
    ];

    const responses = [
        "I want to be a TA because I have a passion for teaching and helping others.",
        "No"
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container fluid className="px-0">
            <Card className="text-center">
                <Card.Body>
                    {questions.map((question, idx) => {
                        return (
                            <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                <Form.Label>
                                    Question {idx + 1}: {question}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="w-75"
                                    value={responses[idx]}
                                    rows="1"
                                    readOnly
                                />
                            </Form.Group>
                        );
                    })}
                </Card.Body>
            </Card>
        </Container>
    );
}
export default ApplicationForm;