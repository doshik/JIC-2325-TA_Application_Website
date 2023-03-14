import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import CalendarModal from "./CalendarModal";
import moment from "moment";
import { submitInterviewRequest } from "../../api/interview";

const ProfSchedulerModal = ({ show, onHide }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [times, setTimes] = useState([moment()]);

  const timeSlots = [1, 2, 3, 4, 5];

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const submitRequest = () => {
    submitInterviewRequest("900000000", times);
  };

  const handleSelectDateAndTime = (selectedDate) => {
    console.log(selectedDate.format()); // Do something with the selected date and time
    setIsModalOpen(false); // Close the modal
  };

  const handleDateChange = (val, index) => {
    // const [hours, minutes] = val.split(":");
    // times[index] = times[index].clone().hours(hours).minutes(minutes);
    var clonedTimes = times.slice();
    clonedTimes[index] = moment(val);

    setTimes(clonedTimes);
  };

  const handleTimeChange = (val, index) => {
    const [hours, minutes] = val.split(":");
    // times[index] = times[index].clone().hours(hours).minutes(minutes);

    var clonedTimes = times.slice();
    clonedTimes[index] = clonedTimes[index]
      .clone()
      .hours(hours)
      .minutes(minutes);
    setTimes(clonedTimes);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Interview Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form.Group controlId="slot">
            <Form.Label>Select a time slot:</Form.Label>
            <div className="d-flex flex-wrap">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={
                    selectedSlot === slot ? "primary" : "outline-primary"
                  }
                  className="m-1"
                  onClick={() => {
                    handleSlotClick(slot);
                    setIsModalOpen(true);
                    console.log(isModalOpen);
                  }}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </Form.Group> */}

          <Form.Group controlId="date">
            {times.map((e, index) => (
              <div style={styles.timeSlot}>
                <div>
                  <h3 key={index}>Time Slot {index + 1}</h3>
                  <label>Date: </label>
                  <input
                    type="date"
                    value={e.format("YYYY-MM-DD")}
                    onChange={(e) => handleDateChange(e.target.value, index)}
                  />
                </div>
                <div>
                  <label>Time: </label>
                  <input
                    type="time"
                    value={e.format("HH:mm")}
                    onChange={(e) => handleTimeChange(e.target.value, index)}
                  />
                </div>
              </div>
            ))}
          </Form.Group>
          {/* add button to add to times array */}
          <Form.Group style={{ marginBottom: "10px", marginTop: "20px" }}>
            <Button
              variant="primary"
              // type="submit"
              onClick={() => {
                setTimes([...times, moment()]);
              }}
            >
              Add Time Slot
            </Button>
          </Form.Group>
          <Button
            variant="primary"
            disabled={!times}
            onClick={() => {
              submitRequest();
              onHide();
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/* <CalendarModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSelectDateAndTime={handleSelectDateAndTime}
      /> */}
    </Modal>
  );
};

export default ProfSchedulerModal;

const styles = {
  timeSlot: {
    marginBottom: "20px",
  },
};
