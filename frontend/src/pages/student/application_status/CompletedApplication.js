import { Form, Container, Row, Col, Card } from "react-bootstrap";

function CompletedApplication(props) {
    const { application } = props;
    const questions = application?.applicationTemplate?.questions;
    const responses = application?.responses;
    console.log(responses)
    return (
        <Container fluid className="px-0">
            <Card className="text-center mb-2">
                <Card.Body>
                    {responses && responses.map((questionObj, idx) => {
                      console.log(questionObj)
                        return (
                            <Form.Group key={idx} as={Row} className="mb-5 d-flex justify-content-center">
                                <Form.Label>
                                    Question {idx + 1}: {questionObj.questionText}
                                </Form.Label>
                                {questionObj.questionType === 'Short Answer' ?
                                    <Form.Control
                                        as="textarea"
                                        className="w-75"
                                        value={responses[idx]?.value || ""}
                                        rows="1"
                                        readOnly
                                        disabled
                                    />
                                    :
                                    questionObj.value ? 
                                      <p>
                                        <a href={`http://127.0.0.1:5001/application/file/download/${questionObj.value}`}>Download File</a>
                                      </p>
                                      :
                                      <p>No file submitted</p>
                                }
                            </Form.Group>
                        );
                    })}
                </Card.Body>
            </Card>
        </Container>
    );
}
export default CompletedApplication;
