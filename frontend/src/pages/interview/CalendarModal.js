import React, { useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";

const CalendarModal = ({ isOpen, onRequestClose, onSelectDateAndTime }) => {
  const [selectedDate, setSelectedDate] = useState(moment()); // Initialize with current date and time

  const handleDateChange = (e) => {
    setSelectedDate(moment(e.target.value));
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    setSelectedDate(selectedDate.clone().hours(hours).minutes(minutes));
  };

  const handleSelect = () => {
    onSelectDateAndTime(selectedDate);
    setSelectedDate(moment()); // Reset to current date and time
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} style={styles.container}>
      <h2>Select a date and time</h2>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={selectedDate.format("YYYY-MM-DD")}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label>Time: </label>
        <input
          type="time"
          value={selectedDate.format("HH:mm")}
          onChange={handleTimeChange}
        />
      </div>
      <button onClick={handleSelect}>Select</button>
    </Modal>
  );
};

export default CalendarModal;

const styles = {
  container: {
    width: "50%",
    height: "100%",
  },
};
