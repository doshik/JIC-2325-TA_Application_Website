import * as React from "react";

import { Button, Table } from "react-bootstrap";

const StudentInterviewView = () => {
  return (
    // Create a section for Interview Requests
    // Create a section for Accepted Interviews

    // <div className="text-center">
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
            <tr>
              <td>CS 1332</td>
              <td>Richard Landry</td>
              <td>Spring 2023</td>
              <td>
                <Button>Choose Time</Button>
              </td>
              <td>
                <Button>Request More Times</Button>
              </td>
            </tr>
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
              <th scope="col"> Select Interview Time</th>
              <th scope="col"> Request More Times </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CS 1332</td>
              <td>Richard Landry</td>
              <td>Spring 2023</td>
              <td>
                <Button>Choose Time</Button>
              </td>
              <td>
                <Button>Request More Times</Button>
              </td>
            </tr>
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
