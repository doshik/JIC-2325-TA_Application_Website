import React, { useState, useEffect } from "react";
import { Button, Table, Card } from "react-bootstrap";
import {
  getInterviewRequests,
  acceptInterviewRequest,
} from "../../../api/interview";
import moment from "moment";
import StudentSchedulerWrapper from "./StudentSchedulerWrapper";

const StudentInterviewView = () => {
  const [interviewRequests, setInterviewRequests] = React.useState([]);
  const [tempRefresh, setTempRefresh] = React.useState(1);

  useEffect(() => {
    // TODO: Replace this with action/redux
    getInterviewRequests().then((requests) => {
      console.log(requests);
      setInterviewRequests(requests.interviewRequests);
    });
  }, [tempRefresh]);

  return (
    <div>
      <h5>Interview Requests</h5>
      <Card className="mb-3">
        <Card.Body>
          <div className="text-center">
            <Table hover size="sm">
              <thead>
                <tr>
                  <th scope="col">Course Name</th>
                  <th scope="col">Professor Name</th>
                  <th scope="col">Semester</th>
                  <th scope="col"> Select Interview Time</th>
                </tr>
              </thead>
              <tbody>
                {interviewRequests.map((request) => {
                  if (request?.acceptedTime === "") {
                    return (
                      <tr>
                        <td>CS 1332</td>
                        <td>Richard Landry</td>
                        <td>Spring 2023</td>
                        <td>
                          <StudentSchedulerWrapper
                            request={request}
                            trigger={() => setTempRefresh(tempRefresh + 1)}
                          />
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

      <h5>Accepted Interviews</h5>
      <Card>
        <Card.Body>
          <div className="text-center">
            <Table hover size="sm">
              <thead>
                <tr>
                  <th scope="col">Course Name</th>
                  <th scope="col">Professor Name</th>
                  <th scope="col">Semester</th>
                  <th scope="col"> Interview Time</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {interviewRequests.map((request) => {
                  if (request?.acceptedTime !== "") {
                    return (
                      <tr>
                        <td>CS 1332</td>
                        <td>Richard Landry</td>
                        <td>Spring 2023</td>
                        <td>
                          {moment(request.acceptedTime).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </td>
                        <td>
                          <div>
                            <Button variant="danger" className="btn-sm w-auto">
                              Cancel
                            </Button>
                          </div>
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
    </div>
  );
};

export default StudentInterviewView;

const styles = {

};
