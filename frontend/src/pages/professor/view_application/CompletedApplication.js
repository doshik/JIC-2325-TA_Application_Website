import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompletedApplication(props) {
  const { application } = props;

  const questions = application?.applicationTemplate?.questions;
  const responses = application?.responses;
  console.log("Prof view app", application);
  var href = null;

  //Todo: make this not hardcoded
  if(application?.attachment)
    href = `http://127.0.0.1:5001/application/file/download/${application.attachment}`
  
  return (
    <Container fluid className="px-0">
      <Card className="text-center mb-2">
        <Card.Body>
          {questions &&
            questions.map((questionObj, idx) => {
              return (
                <Form.Group
                  key={idx}
                  as={Row}
                  className="mb-5 d-flex justify-content-center"
                >
                  <Form.Label>
                    Question {idx + 1}: {questionObj.question}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="w-75"
                    value={responses[idx] || ""}
                    rows="1"
                    readOnly
                    disabled
                  />
                </Form.Group>
              );
            })}
          {application?.attachment && (
            <Form.Group as={Row} className="mb-5 d-flex justify-content-center">
                <p>Attached <a href={href} >File</a></p>
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default CompletedApplication;
