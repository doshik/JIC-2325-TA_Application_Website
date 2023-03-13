import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ProfSchedulerModal = ({ show, onHide, onSubmit }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [1, 2, 3, 4, 5]

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedSlot);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Interview Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="slot">
            <Form.Label>Select a time slot:</Form.Label>
            <div className="d-flex flex-wrap">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? 'primary' : 'outline-primary'}
                  className="m-1"
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!selectedSlot}>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfSchedulerModal;
