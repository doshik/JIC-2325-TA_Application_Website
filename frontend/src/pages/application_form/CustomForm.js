import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function CustomForm() {
  const [fields, setFields] = useState([{ value: null }]);

  function handleAddField() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemoveField(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

    return (
        <Container>
            <Row className="mb-3" style={{ marginTop: '10px', marginBottom: '30px' }}>
                <Col>
                    <Button variant="success">
                        Save Custom Application
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={8} className="mx-auto">
                    {fields.map((field, idx) => {
                        return (
                            <Row className="mb-3" style={{ marginTop: '5px' }}>
                                <Form.Group key={idx} as={Row}>
                                    <Col xs={2}></Col>
                                    <Col xs={8}>
                                        <Form.Label>Question {idx + 1}</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                value={field.value || ''}
                                                onChange={(e) => handleChange(idx, e)}
                                                rows="1"
                                            />
                                    </Col>
                                    <Col xs={2} className="d-flex align-items-center">
                                        {fields.length > 1 && (
                                            <Button variant="danger" onClick={() => handleRemoveField(idx)}>
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
            <Row className="mb-3" style={{ marginTop: '5px' }}>
                <Col>
                    <Button variant="primary" onClick={() => handleAddField()}>
                        Add Question
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CustomForm;