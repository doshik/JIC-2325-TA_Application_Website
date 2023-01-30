import * as React from "react";
import { Form, Card, Button } from "react-bootstrap";

const UserDetails = ({ prevStep }) => {
  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Why do you want to be a TA?</Form.Label>
              <Form.Control
                as="textarea"
                rows="(3)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Do you have any additional information you would like to provide? If yes, write below.</Form.Label>
              <Form.Control
                as="textarea"
                rows="(3)"
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>
              <Button variant="secondary">
                Return to Application Templates
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserDetails;