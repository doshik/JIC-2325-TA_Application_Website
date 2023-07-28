import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import {
  getStudentInterviewRequests,
  deleteInterviewRequest,
} from "../../../api/interview";
import moment from "moment";
import StudentSchedulerWrapper from "./StudentSchedulerWrapper";

const StudentInterviewView = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [tempRefresh, setTempRefresh] = React.useState(1);

  useEffect(() => {
    getStudentInterviewRequests().then((requests) => {
      const accepted = requests.interviewRequests.filter(request => request.acceptedTime !== "" && moment(request.acceptedTime).isAfter(moment()));
      const pending = requests.interviewRequests.filter(request => request.acceptedTime === "");
      const completed = requests.interviewRequests.filter(request => request.acceptedTime !== "" && moment(request.acceptedTime).isBefore(moment()));
      setAcceptedRequests(accepted);
      setPendingRequests(pending);
      setCompletedRequests(completed);
    });
  }, [tempRefresh]);

  function isUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <div>
      {(pendingRequests?.length > 0 || acceptedRequests?.length > 0 || completedRequests?.length > 0) ? (
        <>
          <h5>Interview Requests</h5>
          <Card className="mb-3">
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Professor Name</th>
                      <th scope="col">MS Bookings Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests?.map((request) => {
                      return (
                        <tr>
                          <td>{request.course.courseId}</td>
                          <td>{request.professor.name}</td>
                          <td>
                            {
                              request.course.msBookingsLink ? request.course.msBookingsLink : "The link has not been set yet." 
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <h5>Accepted Interviews</h5>
          <Card className="mb-3">
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Professor Name</th>
                      <th scope="col">Interview Time</th>
                      <th scope="col">Meeting Link</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedRequests?.map((request) => {
                      return (
                        <tr>
                          <td>{request.course.courseId}</td>
                          <td>{request.professor.name}</td>
                          <td>
                            {moment(request.acceptedTime).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </td>
                          <td>
                            {request.meetingLink && isUrl(request.meetingLink) ? (
                                <a href={request.meetingLink}>{request.meetingLink}</a>
                            ) : (
                                request.meetingLink
                            )}
                            </td>
                          <td>
                            <Button 
                              variant="danger" 
                              className="btn-sm w-auto" 
                              onClick={() =>
                                deleteInterviewRequest(request._id).then(() => {
                                  setTempRefresh(tempRefresh + 1);
                                })
                              }>
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <h5>Completed Interviews</h5>
          <Card className="mb-3">
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Professor Name</th>
                      <th scope="col">Interview Time</th>
                      <th scope="col">Meeting Link</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedRequests?.map((request) => {
                      return (
                        <tr>
                          <td>{request.course.courseId}</td>
                          <td>{request.professor.name}</td>
                          <td>
                            {moment(request.acceptedTime).format(
                              "MMMM Do YYYY, h:mm a"
                            )}
                          </td>
                          <td>
                            {request.meetingLink && isUrl(request.meetingLink) ? (
                                <a href={request.meetingLink}>{request.meetingLink}</a>
                            ) : (
                                request.meetingLink
                            )}
                          </td>
                          <td>
                            <Button 
                              variant="danger" 
                              className="btn-sm w-auto" 
                              onClick={() =>
                                deleteInterviewRequest(request._id).then(() => {
                                  setTempRefresh(tempRefresh + 1);
                                })
                              }>
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
      </>
      ) : (
        <Card>
            <Card.Body className="text-center">
                There are currently no interviews.
            </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default StudentInterviewView;