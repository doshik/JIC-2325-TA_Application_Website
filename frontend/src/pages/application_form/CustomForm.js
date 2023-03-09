import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { createApplicationTemplateAction } from "../../redux/actions/applicationActions";
import { useNavigate } from "react-router-dom";

function CustomForm() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([{ question: null }]);
  const [pageNumbers, setPageNumbers] = useState([{ value: null }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddField() {
    const fields = [...questions];
    fields.push({ question: null });
    setQuestions(fields);
  }

  function handleRemoveField(i) {
    const fields = [...questions];
    fields.splice(i, 1);
    setQuestions(fields);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleChange(i, event) {
    const fields = [...questions];
    fields[i].question = event.target.value;
    setQuestions(fields);
  }

  //   function handleAddPageNumber() {
  //     const values = [...pageNumbers];
  //     values.push({ value: null });
  //     setPageNumbers(values);
  //   }

  //   function handleRemovePageNumber(i) {
  //     const values = [...pageNumbers];
  //     values.splice(i, 1);
  //     setPageNumbers(values);
  //   }

  //   function handlePageNumberChange(i, event) {
  //     const values = [...pageNumbers];
  //     values[i].value = event.target.value;
  //     setPageNumbers(values);
  //   }

  function handleSubmit(event) {
    console.log(questions);
    dispatch(createApplicationTemplateAction(name, questions));
    navigate("/user/prof/applicationtemplates");
    // console.log(pageNumbers);
  }

  return (
    <Container>
      <Row>
        <Col xs={8} className="mx-auto">
          <Row className="mb-3" style={{ marginTop: "5px" }}>
            <Form.Group as={Row}>
              <Col xs={2} />

              <Col xs={8}>
                <Form.Label>Application Name</Form.Label>

                <Form.Control
                  as="textarea"
                  onChange={(e) => handleNameChange(e)}
                  rows="1"
                />
              </Col>
            </Form.Group>
          </Row>

          {questions.map((field, idx) => {
            // console.log(pageNumbers[idx]);
            return (
              <Row className="mb-3" style={{ marginTop: "5px" }}>
                <Form.Group key={idx} as={Row}>
                  <Col xs={2} />
                  <Col xs={8}>
                    <Form.Label>Question {idx + 1}</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={field.question || ""}
                      onChange={(e) => handleChange(idx, e)}
                      rows="1"
                    />
                    {/* <div style={{ marginTop: "10px" }}>
                      <Form.Group controlId="pageNumber">
                        <Form.Label>Page Number: </Form.Label>
                        <Form.Check
                          inline
                          name={`pageNumberRadio${idx}`}
                          type="radio"
                          label="1"
                          value="1"
                          checked={pageNumbers[idx].value === "1"}
                          onChange={(e) => handlePageNumberChange(idx, e)}
                          style={{ marginLeft: "10px" }}
                        />
                        <Form.Check
                          inline
                          name={`pageNumberRadio${idx}`}
                          type="radio"
                          label="2"
                          value="2"
                          checked={pageNumbers[idx].value === "2"}
                          onChange={(e) => handlePageNumberChange(idx, e)}
                        />
                        <Form.Check
                          inline
                          name={`pageNumberRadio${idx}`}
                          type="radio"
                          label="3"
                          value="3"
                          checked={pageNumbers[idx].value === "3"}
                          onChange={(e) => handlePageNumberChange(idx, e)}
                        />
                      </Form.Group>
                    </div> */}
                  </Col>
                  <Col xs={2} className="d-flex align-items-center">
                    {questions.length > 1 && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleRemoveField(idx);
                          //   handleRemovePageNumber(idx);
                        }}
                      >
                        X
                      </Button>
                    )}
                  </Col>
                </Form.Group>
              </Row>
            );
          })}
        </Col>
      </Row>
      <Row className="mb-3" style={{ marginTop: "5px" }}>
        <Col>
          <Button
            variant="primary"
            styles={styles.button}
            onClick={() => {
              handleAddField();
              //   handleAddPageNumber();
            }}
          >
            Add Question
          </Button>
          <Button
            styles={styles.button}
            variant="success"
            onClick={() => handleSubmit()}
          >
            Save Custom Application
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomForm;

const styles = {
  button: {
    marginRight: "10px",
  },
};
