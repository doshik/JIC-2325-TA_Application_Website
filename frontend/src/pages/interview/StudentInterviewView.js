import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import {
  getInterviewRequests,
  acceptInterviewRequest,
} from "../../api/interview";
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
      <h2>Interview Requests</h2>

      <div style={styles.section}>
        <Table hover size="sm">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Professor Name</th>
              <th scope="col">Semester</th>
              <th scope="col"> Select Interview Time</th>
              <th scope="col"> Request More Times </th>
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
                    <td>
                      <Button className="btn-sm w-auto">
                        Request More Times
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

      <h2>Accepted Interviews</h2>

      <div style={styles.section}>
        <Table hover size="sm">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Professor Name</th>
              <th scope="col">Semester</th>
              <th scope="col"> Interview Time</th>
              <th scope="col"> Request More Times </th>
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
                        <Button className="btn-sm w-auto">
                          Request More Times
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
    </div>
  );
};

export default StudentInterviewView;

const styles = {
  section: {
    marginBottom: "30px",
    marginTop: "5px",
    textAlign: "center",
  },
};
