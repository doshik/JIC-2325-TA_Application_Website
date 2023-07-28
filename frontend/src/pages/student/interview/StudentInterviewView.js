import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import {
  getStudentInterviewRequests,
  deleteInterviewRequest,
} from "../../../api/interview";
import StudentSchedulerWrapper from "./StudentSchedulerWrapper";

const StudentInterviewView = () => {
  const [requests, setRequests] = useState([]);
  const [tempRefresh, setTempRefresh] = React.useState(1);
  
  useEffect(() => {
    getStudentInterviewRequests().then((data) => {
      setRequests(data.interviewRequests);
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
      {requests?.length > 0 ? (
        <>
          <h5>Interviews</h5>
          <Card className="mb-3">
            <Card.Body>
              <div className="text-center">
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th scope="col">Course Name</th>
                      <th scope="col">Professor Name</th>
                      <th scope="col">MS Bookings Link</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.map((request) => {
                      return (
                        <tr>
                          <td>{request.course.courseId}</td>
                          <td>{request.professor.name}</td>
                          <td>
                            {request.course.msBookingsLink && isUrl(request.course.msBookingsLink) ? (
                                <a href={request.course.msBookingsLink}>{request.course.msBookingsLink}</a>
                            ) : (
                                request.course.msBookingsLink || "The link has not been set yet."
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
