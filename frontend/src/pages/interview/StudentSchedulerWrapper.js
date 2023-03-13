import React, { useState } from 'react';
import StudentSchedulerModal from './StudentSchedulerModal';
import { Button, Card, Row, Col, Container } from "react-bootstrap";

const StudentSchedulerWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = (slot) => {
    console.log('Selected slot:', slot);
    // Do something with the selected slot, e.g. create a video meeting link
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Select Interview Slot</Button>
      <StudentSchedulerModal show={showModal} onHide={() => setShowModal(false)} onSubmit={handleModalSubmit} />
    </>
  );
};

export default StudentSchedulerWrapper;