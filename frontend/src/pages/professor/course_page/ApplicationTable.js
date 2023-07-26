import * as React from "react";
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  Button, Form, DropdownButton, Dropdown, FormGroup,
} from "react-bootstrap";

import {
  Table, Header, HeaderRow, Body, Row, HeaderCell, Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";

import ProfSchedulerWrapper from "./ProfSchedulerWrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfApplicationsAction, updateApplicationStatusAction,
} from "../../../redux/actions/applicationActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
const ApplicationTable = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applications = useSelector((state) => state.application.applications);
  const [statuses, setStatuses] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("");
  const [coursesTakenFilter, setCoursesTakenFilter] = React.useState([]);
  const [coursesTakingFilter, setCoursesTakingFilter] = React.useState([]);
  const [majorFilter, setMajorFilter] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [curPage, setCurPage] = React.useState(1);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentApplicationId, setCurrentApplicationId] = useState(null);

  const handleChatIconClick = async (applicationId) => {
    console.log("chat icon clicked: ", applicationId)

    try {
        const response = await axios.get(`http://127.0.0.1/note/getByApplication/${applicationId}`);
        const fetchedMessages = response.data.notes; // Adjust according to your specific JSON structure
        console.log('fetched: ', fetchedMessages);
        console.log('fetched: ', fetchedMessages[0])
        setCurrentApplicationId(applicationId);
        setChatMessages(fetchedMessages);
        setChatModalOpen(true);
    } catch(error) {
        console.error(`Error occurred while fetching messages for applicationId: ${applicationId}`, error);
    }
};

  const handleClose = () => setChatModalOpen(false);

  const handleSendMessage = async (appId) => {
    
    // Send newMessage to your API
    // Then, add newMessage to chatMessages and clear newMessage

    const newMessageObject = {
      message: newMessage,
      username: "currentUser", 
      timestamp: new Date().toISOString(),
      applicationId: currentApplicationId, 
    };
    try {
      const response = await axios.post('http://127.0.0.1/note/add', newMessageObject);
      console.log(response.data);  // Response from the server

      setChatMessages([...chatMessages, newMessageObject]);
      setNewMessage("");

  } catch (error) {
      console.error('Error sending new message:', error);
  }
  };

  useEffect(() => {
    updateData();
  }, [course, curPage, sortBy, coursesTakenFilter, coursesTakingFilter, majorFilter]);

  useEffect(() => {
    if (applications?.submissions) {
      setStatuses(applications.submissions.map((application) => application.status));
    }
  }, [applications]);

  const handleStatusChange = (id, idx, email) => async (event) => {
    try {
      const status = event.target.value;
      await dispatch(updateApplicationStatusAction(id, status, course.courseId, email));
      const newStatuses = [...statuses];
      newStatuses[idx] = status;
      setStatuses(newStatuses);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const updateData = () => {
    let sort_by_gpa = (sortBy === "GPA");
    let sort_by_year = (sortBy === "Year");

    dispatch(getProfApplicationsAction(course._id, pageSize, curPage, 
        sort_by_gpa, sort_by_year, majorFilter, coursesTakenFilter, coursesTakingFilter));
  }

  const data = { nodes: applications?.submissions || [] };
  const pagination = usePagination(data, {
    state: {
      page: 0,
      total: 5,
      size: 5,
    }
  });

  return (
      <>
        <Form inline>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Form.Group controlId="sort_by" style={{ marginRight: '50px' }}>
              <Form.Label>Sort by: &nbsp;</Form.Label>
              <DropdownButton id="gpa" title={sortBy || "Set sort criteria"}>
                <Dropdown.Item onClick={() => setSortBy("GPA")}>GPA</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Year")}>Year</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="multiSelect1" style={{ marginRight: '50px' }}>
              <Form.Label>Courses Taking: &nbsp;</Form.Label>
              <Select
                  id="multiSelect1"
                  onChange={(e) =>
                      setCoursesTakingFilter(e.map((item) => item.value))
                  }
                  options={["CS 1332", "CS 2110"].map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  isMulti
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 999 }) }}
              />
            </Form.Group>
            <Form.Group controlId="multiSelect2" style={{ marginRight: '50px' }}>
              <Form.Label>Courses Taken: &nbsp;</Form.Label>
              <Select
                  id="multiSelect2"
                  onChange={(e) =>
                      setCoursesTakenFilter(e.map((item) => item.value))
                  }
                  options={["CS 1332", "CS 2110"].map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  isMulti
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 999 }) }}
              />
            </Form.Group>
            <Form.Group controlId="multiSelect3">
              <Form.Label>Majors: &nbsp;</Form.Label>
              <Select
                  id="multiSelect3"
                  onChange={(e) => setMajorFilter(e.map((item) => item.value))}
                  options={['CS', 'EE'].map((option) => ({
                    value: option,
                    label: option,
                  }))} isMulti/>
            </Form.Group>
          </div>
        </Form>
        <Table  data={data} pagination={pagination}>{
          (list) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell></HeaderCell >
                    <HeaderCell></HeaderCell >
                    <HeaderCell></HeaderCell >
                    <HeaderCell>Name</HeaderCell >
                    <HeaderCell>Year</HeaderCell>
                    <HeaderCell>GPA</HeaderCell>
                    <HeaderCell>Major</HeaderCell>
                    <HeaderCell>Status</HeaderCell>
                    <HeaderCell></HeaderCell>
                  </HeaderRow>
                </Header>
                <Body>
                  {list &&
                      list.map((application, idx) => (
                          application.course.courseId === course.courseId &&
                          <Row key={application._id} item={application}>
                            <Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-${application._id}`}>
                                  {application.student.name}<br />
                                  {application.student.email}<br />
                                  <strong>GTID:</strong> {application.student.gtID}<br />
                                </Tooltip>
                              }
                            >
                              {
                                application.student.profile_picture_key ? 
                                  <img 
                                    src={`/application/file/download/${application.student.profile_picture_key}`} 
                                    alt="Profile"
                                    style={{ width: '50px', height: '50px', cursor: 'pointer', borderRadius: '50%'  }} // change these values as needed 
                                  /> : 
                                  <FontAwesomeIcon 
                                    icon={faUserCircle} 
                                    size='2x' // change this value as needed 
                                  />
                              }
                            </OverlayTrigger>
                            </Cell>
                            <Cell>
                              <FontAwesomeIcon 
                                icon={faComments} 
                                onClick={() => handleChatIconClick(application._id)}
                                style={{cursor: "pointer"}}
                              />
                            </Cell>
                            <Cell>
                              <Button
                                  variant="primary"
                                  onClick={() =>
                                      navigate("/viewapplication", { state: { application } })
                                  }>View</Button>
                            </Cell>
                            <Cell>{application.student.name}</Cell>
                            <Cell>{application.student.userInfo.year}</Cell>
                            <Cell>{application.student.userInfo.gpa}</Cell>
                            <Cell>{application.student.userInfo.major}</Cell>
                            <Cell>
                              <FormGroup controlId="updateStatus">
                                <select className="btn btn-light" value={statuses[idx] || ''} onChange={handleStatusChange(application._id, idx, application.student.email)}>
                                  <option value="Submitted">Submitted</option>
                                  <option value="Hired">Hired</option>
                                  <option value="Interview">Interview</option>
                                  <option value="Denied">Denied</option>
                                </select></FormGroup>
                            </Cell>
                            <Cell>
                              <ProfSchedulerWrapper application={application} />
                            </Cell>
                            <Modal show={chatModalOpen} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Notes</Modal.Title>
                              </Modal.Header>
                              <Modal.Body style={{overflowY: "auto", maxHeight: "60vh"}}> {/* This will limit the height of the body and make it scrollable */}
                                {chatMessages.map((msg, idx) => (
                                  <div key={idx} style={{marginBottom: '1em'}}>
                                    <p>{msg.message}</p>
                                    <div style={{borderTop: '1px solid #ddd', paddingBottom: '0.5em'}}>
                                      <div style={{display: 'inline-block', marginRight: '10px', fontSize: '.8em', color: 'gray'}}>
                                        <strong>{msg.username}</strong>
                                      </div>
                                      <div style={{display: 'inline-block', fontSize: '0.8em', color: '#888'}}>
                                        {
                                          `${new Date(msg.timestamp).getDate()}/${new Date(msg.timestamp).getMonth()+1} 
                                          ${new Date(msg.timestamp).getHours()}:${new Date(msg.timestamp).getMinutes()<10?'0':''}${new Date(msg.timestamp).getMinutes()}`
                                        }
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </Modal.Body>
                              <Modal.Footer>
                                <Form.Control
                                  type="text"
                                  value={newMessage}
                                  onChange={
                                    (e) => setNewMessage(e.target.value)
                                  }
                                  placeholder="Enter your message"
                                />
                                <Button onClick={() => {handleSendMessage(application._id)}}>Send</Button>
                              </Modal.Footer>
                            </Modal>
                          </Row>
                      ))}
                </Body>
              </>
          )
        }
        </Table>

        <div className="mb-3">
        <Button
          disabled={curPage === 1}
          onClick={() => setCurPage(curPage - 1)}
        >
          <ArrowLeft />
        </Button>

        <span style={{margin:"0px 10px"}}>
          Page {applications?.submissions ? curPage : 0} of {applications?.submissions ? applications.totalPages : 0}
        </span>

        <Button
          disabled={curPage >= applications.totalPages}
          onClick={() => setCurPage(curPage + 1)}
        >
          <ArrowRight />
        </Button>
      </div>
      </>
  );
};

export default ApplicationTable;