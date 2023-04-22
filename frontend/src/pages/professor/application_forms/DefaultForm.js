import { Form, Container, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function DefaultForm() {
    const location = useLocation();
    const template = location.state.template;;

    return (
        <Container fluid>
            <Card className="text-center">
                <Card.Body>
                    {template && template.questions.map((questionObj, idx) => {
                        return (
                            <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                <Form.Label>
                                    Question {idx + 1}: {questionObj.question}
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="w-75"
                                    rows="1"
                                    disabled
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
export default DefaultForm;