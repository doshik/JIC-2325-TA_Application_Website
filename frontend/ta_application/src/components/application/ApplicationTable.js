import * as React from "react";
import Table from "react-bootstrap/Table";

// function BasicExample() {
//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Username</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>1</td>
//           <td>Mark</td>
//           <td>Otto</td>
//           <td>@mdo</td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Jacob</td>
//           <td>Thornton</td>
//           <td>@fat</td>
//         </tr>
//         <tr>
//           <td>3</td>
//           <td colSpan={2}>Larry the Bird</td>
//           <td>@twitter</td>
//         </tr>
//       </tbody>
//     </Table>
//   );
// }

const ApplicationTable = () => {
  // make a table with the following columns:
  // 1. Name
  // 2. Email
  // 3. Year
  // 4. Program
  // 5. Status
  // 6. Application
  // 7. Action

  // make the table
  //   return (
  //     <>
  //       <div>
  //         <h1>Application Table</h1>
  //       </div>
  //       <table>
  //         <tr>
  //           <th>Name</th>
  //           <th>Email</th>
  //           <th>Year</th>
  //           <th>Program</th>
  //           <th>Status</th>
  //           <th>Application</th>
  //           <th>Action</th>
  //         </tr>
  //         <tr>
  //           <td>John</td>
  //           <td>
  //             <a href="mailto:"></a>
  //           </td>
  //           <td>1</td>
  //           <td>Computer Science</td>
  //           <td>Accepted</td>
  //           <td>
  //             <a href="">View</a>
  //           </td>
  //           <td>
  //             <button type="button">Accept</button>
  //             <button type="button">Reject</button>
  //           </td>
  //         </tr>
  //       </table>
  //     </>
  //   );
  // };
  return (
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
      <tbody>
        <tr>
          <td>John</td>
          <td>
            <a href="mailto:"></a>
          </td>
          <td>1</td>
          <td>Computer Science</td>
          <td>Accepted</td>
          <td>
            <a href="">View</a>
          </td>
          <td>
            <button type="button">Accept</button>
            <button type="button">Reject</button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ApplicationTable;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
    height: "100vh",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  },
  link: {
    color: "#61dafb",
  },
  table: {
    width: "80%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
};
