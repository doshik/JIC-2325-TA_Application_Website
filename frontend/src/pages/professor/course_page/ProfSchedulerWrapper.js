import React, { useState } from "react";
import ProfSchedulerModal from "./ProfSchedulerModal";
import { Button } from "react-bootstrap";

const ProfSchedulerWrapper = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { application } = props;

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="secondary" style={{fontSize: "11px"}}>
        Schedule Interview
      </Button>
      <ProfSchedulerModal application={application} show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
};

export default ProfSchedulerWrapper;
