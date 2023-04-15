import * as React from "react";
import Table from "react-bootstrap/Table";
import ProfSchedulerWrapper from "./ProfSchedulerWrapper";

const ApplicationTable = () => {
  const [applications, setApplications] = React.useState([]);

  let testApplications = [
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },{
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    },
    {
      name: "John",
      email: "georgepburdell@gatech.edu",
      year: "1",
      program: "Computer Science",
      status: "Accepted",
      application: "View",
    }
  ];

  return (
    <>
    <Table hover className="text-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Program</th>
          <th>Status</th>
          <th>Schedule Interview</th>
          <th>Application</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {testApplications && testApplications.map((application) => (
          <tr>
            <td>{application.name}</td>
            <td>{application.email}</td>
            <td>{application.year}</td>
            <td>{application.program}</td>
            <td>{application.status}</td>
            <td>
              <ProfSchedulerWrapper />
            </td>
            <td>
              <a href="">View</a>
            </td>
            <td>
              <select id="status" className="w-100">
                <option value="accept">Accept</option>
                <option value="interview">Interview</option>
                <option value="reject">Reject</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default ApplicationTable;
