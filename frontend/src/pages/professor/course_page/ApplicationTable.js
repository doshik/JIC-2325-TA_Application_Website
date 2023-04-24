import * as React from "react";
import { Table, Row, Col, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";
import ProfSchedulerWrapper from "./ProfSchedulerWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getProfApplicationsAction, updateApplicationStatusAction } from "../../../redux/actions/applicationActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationTable = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = props;
  const applications = useSelector((state) => state.application.applications);
  const [statuses, setStatuses] = React.useState([]);

  useEffect(() => {
    dispatch(getProfApplicationsAction(course._id));
  }, [dispatch]);

  useEffect(() => {
    setStatuses(applications.map((application) => application.status));
  }, [applications]);

  const handleStatusChange = (id, idx) => (status) => {
    const newStatuses = [...statuses];
    newStatuses[idx] = status;
    setStatuses(newStatuses);
    dispatch(updateApplicationStatusAction(id, status));
    window.location.reload();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "primary";
      case "Hired":
        return "success";
      case "Interview":
        return "warning";
      case "Denied":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <>
    <Table hover className="text-center">
      <thead>
        <tr>
          <th>Application</th>
          <th>Name</th>
          <th>Email</th>
          <th>GTID</th>
          <th>Year</th>
          <th>Program</th>
          <th>Status</th>
          <th>Change Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications && applications.map((application, idx) => (
          <tr key={application._id}>
            <td><Button variant="primary" onClick={() => navigate("/viewapplication", { state: { application }})}>View</Button></td>
            <td>{application.student.name}</td>
            <td>{application.student.email}</td>
            <td>{application.student.gtID}</td>
            <td>{application.student.userInfo.year}</td>
            <td>{application.student.userInfo.program}</td>
            <td>{application.status}</td>
            <td>
              <Form.Group controlId="updateStatus">
                <DropdownButton
                  key={application._id}
                  variant={getStatusColor(statuses[idx])}
                  title={statuses[idx] || "Select Status"}
                  onSelect={handleStatusChange(application._id, idx)}
                  default="Submitted"
                >
                  <Dropdown.Item eventKey="Submitted">Submitted</Dropdown.Item>
                  <Dropdown.Item eventKey="Hired">Hired</Dropdown.Item>
                  <Dropdown.Item eventKey="Interview">Interview</Dropdown.Item>
                  <Dropdown.Item eventKey="Denied">Denied</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
            </td>
            <td>
              <ProfSchedulerWrapper application={application}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default ApplicationTable;
