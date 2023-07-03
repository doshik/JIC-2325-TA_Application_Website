import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompletedApplication(props) {
  const { application } = props;

  const questions = application?.applicationTemplate?.questions;
  const responses = application?.responses;
  console.log("Prof view app", application);
  var href = null;


  return (
    <Container fluid className="px-0">
      <Card className="text-center mb-2">
        <Card.Body>
          {application &&
            application.responses.map((questionObj, idx) => {
              console.log("Prof view app", questionObj)
              if (questionObj.questionType === "Short Answer") {
                return (
                  <Form.Group
                    key={idx}
                    as={Row}
                    className="mb-5 d-flex justify-content-center"
                  >
                    <Form.Label>
                      Question {idx + 1}: {questionObj.questionText}
                    </Form.Label>
              
                    <Form.Control
                      as="textarea"
                      className="w-75"
                      value={responses[idx].value || ""}
                      rows="1"
                      readOnly
                      disabled
                    />
                  </Form.Group>
                );
              } else if (questionObj.questionType === "File Attachment") {
                return (
                  <>
                    <Form.Label>
                      Question {idx + 1}: {questionObj.questionText}
                    </Form.Label>
                    {
                    questionObj.value ? 
                                      <p>
                                        <a href={`http://127.0.0.1:5001/application/file/download/${questionObj.value}`}>Download File</a>
                                      </p>
                                      :
                                      <p>No file submitted</p>
                    }
                  </>
                );
              }
            })}
        </Card.Body>
      </Card>
    </Container>
  );
}
export default CompletedApplication;
