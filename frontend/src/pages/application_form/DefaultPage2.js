import * as React from "react";
import { Form, Card, Button } from "react-bootstrap";

const DefaultPage2 = ({ prevStep }) => {
  return (
    <>
      <Card className="mt-1">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Why do you want to be a TA?</Form.Label>
              <Form.Control as="textarea" rows="3" disabled readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Do you have any additional information you would like to
                provide? If yes, write below.
              </Form.Label>
              <Form.Control as="textarea" rows="3" disabled readOnly />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default DefaultPage2;
