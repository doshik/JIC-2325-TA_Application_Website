import React from "react";
import { Modal, Button } from "react-bootstrap";
import { submitInterviewRequest } from "../../../api/interview";

const ProfSchedulerModal = ({ application, show, onHide }) => {

  const handleContinue = () => {
    submitInterviewRequest(application.student._id, application.course._id, [], "");
    onHide();
  };
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to continue?
        <div className="d-flex justify-content-end mt-4">
          <Button variant="outline-secondary" className="mr-2" onClick={onHide}>Cancel</Button>
          <Button variant="primary" onClick={handleContinue} style={{ marginLeft: "20px" }}>Continue</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProfSchedulerModal;
