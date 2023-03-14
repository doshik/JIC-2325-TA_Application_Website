import React, { useState } from "react";
import StudentSchedulerModal from "./StudentSchedulerModal";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

const StudentSchedulerWrapper = ({ request, trigger }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <Button onClick={() => setShowModal(true)} className="btn-sm w-auto">
          Select Interview Slot
        </Button>
        <StudentSchedulerModal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            trigger();
          }}
          request={request}
        />
      </div>
    </>
  );
};

export default StudentSchedulerWrapper;
