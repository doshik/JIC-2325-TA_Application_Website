import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import { getProfInterviewRequests, deleteInterviewRequest } from "../../../api/interview";
import moment from "moment";

const ProfInterviewView = () => {
  const [interviewRequests, setInterviewRequests] = React.useState([]);
  const [tempRefresh, setTempRefresh] = React.useState(1);

  useEffect(() => {
    // TODO: Replace this with action/redux
    getProfInterviewRequests().then((requests) => {
      console.log(requests);
      setInterviewRequests(requests.interviewRequests);
    });
  }, [tempRefresh]);

  return (
    <div>
      {interviewRequests.length > 0 ? (
        <>
          <h5>Pending Interviews</h5>
          <Card className="mb-3">
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Student Name</th>
                      <th scope="col">Course Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewRequests.map((request) => {
                      if (request?.acceptedTime === "") {
                        return (
                          <tr>
                            <td>{request.student.name}</td>
                            <td>{request.course.courseId}</td>
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
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <h5>Scheduled Interviews</h5>
          <Card>
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                    <th scope="col">Student Name</th>
                      <th scope="col">Course Name</th>
                      <th scope="col">Interview Time</th>
                      <th scope="col">Meeting Link</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewRequests.map((request) => {
                      if (request?.acceptedTime !== "") {
                        return (
                          <tr>
                            <td>{request.student.name}</td>
                            <td>{request.course.courseId}</td>
                            <td>
                              {moment(request.acceptedTime).format(
                                "MMMM Do YYYY, h:mm a"
                              )}
                            </td>
                            <td><a href={request.meetingLink}>{request.meetingLink}</a></td>
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
                      } else {
                        return null;
                      }
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

export default ProfInterviewView;

