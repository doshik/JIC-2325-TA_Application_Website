import React, { useState } from "react";
import ProfSchedulerModal from "./ProfSchedulerModal";
import { Button } from "react-bootstrap";

const ProfSchedulerWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="primary">
        Schedule Interview
      </Button>
      <ProfSchedulerModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default ProfSchedulerWrapper;
