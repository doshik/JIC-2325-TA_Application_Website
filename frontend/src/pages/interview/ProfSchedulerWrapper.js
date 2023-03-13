import React, { useState } from 'react';
import ProfSchedulerModal from './ProfSchedulerModal';
import { Button, Card, Row, Col, Container } from "react-bootstrap";

const ProfSchedulerWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = (slot) => {
    console.log('Selected slot:', slot);
    // Do something with the selected slot, e.g. create a video meeting link
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Select Interview Slot</Button>
      <ProfSchedulerModal show={showModal} onHide={() => setShowModal(false)} onSubmit={handleModalSubmit} />
    </>
  );
};

export default ProfSchedulerWrapper;

