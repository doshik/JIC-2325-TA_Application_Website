import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import { getProfInterviewRequests, deleteInterviewRequest } from "../../../api/interview";
import moment from "moment";

const ProfInterviewView = () => {
  const [requests, setRequests] = useState([]);
  const [tempRefresh, setTempRefresh] = React.useState(1);

  useEffect(() => {
    getProfInterviewRequests().then((requests) => {
      setRequests(requests.interviewRequests);
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

  function getStatus(request) {
    if (request.acceptedTime === "") {
      return "Pending";
    } else if (moment(request.acceptedTime).isAfter(moment())) {
      return "Scheduled";
    } else {
      return "Completed";
    }
  }

  return (
    <div>
      {requests?.length > 0 ? (
        <Card className="mb-3">
          <Card.Body>
            <div className="text-center">
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th scope="col">Student Name</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">MS Bookings Link</th>
                    <th scope="col">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requests?.map((request) => {
                    return (
                      <tr>
                        <td>{request.student.name}</td>
                        <td>{request.course.courseId}</td>
                        <td>
                          {request.course.msBookingsLink && isUrl(request.course.msBookingsLink) ? (
                              <a href={request.course.msBookingsLink}>{request.course.msBookingsLink}</a>
                          ) : (
                              request.course.msBookingsLink || "The link has not been set yet."
                          )}
                        </td>
                        <td>{getStatus(request)}</td>
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
