import * as React from "react";
import Table from "react-bootstrap/Table";
import SchedulerWrapper from './SchedulerWrapper';

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
  ];

  testApplications.push(...testApplications);
  testApplications.push(...testApplications);

  return (
    <>
    <Table striped bordered hover style={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Program</th>
          <th>Status</th>
          <th>Application</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{applicationsToRows(testApplications)}</tbody>
    </Table>
    </>
  );
};

const applicationsToRows = (applications) => {
  return applications.map((application) => {
    return (
      <tr>
        <td>{application.name}</td>
        <td>{application.email}</td>
        <td>{application.year}</td>
        <td>{application.program}</td>
        <td>{application.status}</td>
        <td>
          <a href="">View</a>
        </td>
        <select style={{width: '100%'}}>
          <option value="accept">Accept</option>
          <option value="reject">Reject</option>
        </select>
      </tr>
    );
  });
};

export default ApplicationTable;

const styles = {
  
  link: {
    color: "#61dafb",
  },
  
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
};
