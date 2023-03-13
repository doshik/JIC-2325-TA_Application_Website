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
      <div className="d-flex justify-content-between align-items-center">
        <Button onClick={() => setShowModal(true)} className="btn-sm w-auto">Select Interview Slot</Button>
        <StudentSchedulerModal show={showModal} onHide={() => setShowModal(false)} onSubmit={handleModalSubmit} />
      </div>
    </>
  );
};

export default StudentSchedulerWrapper;