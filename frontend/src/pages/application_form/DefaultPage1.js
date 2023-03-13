import * as React from "react";
import { Form, Card, Button } from "react-bootstrap";

const DefaultPage1 = ({ nextStep }) => {
  return (
    <div>
      <Card className="mt-1">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                placeholder="First Name"
                disabled
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                placeholder="Last Name"
                disabled
                readOnly
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" onClick={nextStep}>
                Continue
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DefaultPage1;
