import * as React from "react";
import Select from 'react-select'
import {
  //Table,
  //Row,
  Col,
  Button,
  Form,
  DropdownButton,
  Dropdown, FormGroup, FormSelect,
} from "react-bootstrap";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

import ProfSchedulerWrapper from "./ProfSchedulerWrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfApplicationsAction,
  updateApplicationStatusAction,
} from "../../../redux/actions/applicationActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationTable = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course } = props;
  const applications = useSelector((state) => state.application.applications);
  const [statuses, setStatuses] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("");
  const [coursesTakenFilter, setCoursesTakenFilter] = React.useState([]);
  const [coursesTakingFilter, setCoursesTakingFilter] = React.useState([]);
  const [majorFilter, setMajorFilter] = React.useState([]);

  const handleStatusChange = (id, idx) => async (event) => {
    try {
      const status = event.target.value;
      await dispatch(updateApplicationStatusAction(id, status));
      const newStatuses = [...statuses];
      newStatuses[idx] = status;
      setStatuses(newStatuses);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const update = () => {
    let sort_by_gpa = (sortBy === "GPA")
    let sort_by_year = (sortBy === "Year")

    dispatch(getProfApplicationsAction(course._id, sort_by_gpa=sort_by_gpa, sort_by_year=sort_by_year, majorFilter, coursesTakenFilter, coursesTakingFilter));

    console.log(data)
  }

  useEffect(() => {
    dispatch(getProfApplicationsAction(course._id));
  }, [dispatch]);

  useEffect(() => {
    if (applications && applications.length > 0) {
      setStatuses(applications.map((application) => application.status));
    }
  }, [applications]);

  useEffect(() => {
    update()
  }, [sortBy]);

  useEffect(() => {
    update()
  }, [coursesTakingFilter]);

  useEffect(() => {
    update()
  }, [coursesTakenFilter]);

  useEffect(() => {
    update()
  }, [majorFilter]);

  const data = { nodes: applications }

  return (
      <>
        <Form inline>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Group controlId="sort_by">
              <Form.Label>Sort by: &nbsp;</Form.Label>
              <DropdownButton id="gpa" title={sortBy || "Set sort criteria"}>
                <Dropdown.Item onClick={() => setSortBy("GPA")}>GPA</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("Year")}>Year</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group controlId="multiSelect1">
              <Form.Label>Courses Taking: &nbsp;</Form.Label>
              <Select
                  id="multiSelect1"
                  onChange={(e) =>
                      setCoursesTakingFilter(e.map((item) => item.value))
                  }
                  options={["CS 1332", "CS 2110"].map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  isMulti
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 999 }) }}
              />
            </Form.Group>
            <Form.Group controlId="multiSelect2">
              <Form.Label>Courses Taken: &nbsp;</Form.Label>
              <Select
                  id="multiSelect2"
                  onChange={(e) =>
                      setCoursesTakenFilter(e.map((item) => item.value))
                  }
                  options={["CS 1332", "CS 2110"].map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  isMulti
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 999 }) }}
              />
            </Form.Group>
            <Form.Group controlId="multiSelect3">
              <Form.Label>Majors: &nbsp;</Form.Label>
              <Select
                  id="multiSelect3"
                  onChange={(e) => setMajorFilter(e.map((item) => item.value))}
                  options={['CS', 'EE'].map((option) => ({
                    value: option,
                    label: option,
                  }))} isMulti/>
            </Form.Group>
          </div>
        </Form>
        <Table data={data}>{
          (list) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell>Application</HeaderCell >
                    <HeaderCell>Name</HeaderCell >
                    <HeaderCell >Email</HeaderCell >
                    <HeaderCell >GTID</HeaderCell >
                    <HeaderCell>Year</HeaderCell>
                    <HeaderCell>GPA</HeaderCell>
                    <HeaderCell>Major</HeaderCell>
                    <HeaderCell>Status</HeaderCell>
                    <HeaderCell></HeaderCell>
                  </HeaderRow>
                </Header>
                <Body>
                  {props?.semester === "Spring 2023" &&
                      list &&
                      list.map((application, idx) => (
                          <Row key={application._id} item={application}>
                            <Cell>
                              <Button
                                  variant="primary"
                                  onClick={() =>
                                      navigate("/viewapplication", { state: { application } })
                                  }>View</Button>
                            </Cell>
                            <Cell>{application.student.name}</Cell>
                            <Cell>{application.student.email}</Cell>
                            <Cell>{application.student.gtID}</Cell>
                            <Cell>{application.student.userInfo.year}</Cell>
                            <Cell>{application.student.userInfo.gpa}</Cell>
                            <Cell>{application.student.userInfo.major}</Cell>
                            <Cell>
                              <FormGroup controlId="updateStatus">
                                <select value={statuses[idx] || ''} onChange={handleStatusChange(application._id, idx)}>
                                  <option value="Submitted">Submitted</option>
                                  <option value="Hired">Hired</option>
                                  <option value="Interview">Interview</option>
                                  <option value="Denied">Denied</option>
                                </select></FormGroup>
                            </Cell>
                            <Cell>
                              <ProfSchedulerWrapper application={application} />
                            </Cell>
                          </Row>
                      ))}
                </Body>
              </>
          )
        }
        </Table>
      </>
  );
};

// const OldApplicationTable = (props) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { course } = props;
//   const applications = useSelector((state) => state.application.applications);
//   const [statuses, setStatuses] = React.useState([]);
//
//   useEffect(() => {
//     dispatch(getProfApplicationsAction(course._id));
//   }, [dispatch]);
//
//   useEffect(() => {
//     setStatuses(applications.map((application) => application.status));
//   }, [applications]);
//
//   const handleStatusChange = (id, idx) => (status) => {
//     const newStatuses = [...statuses];
//     newStatuses[idx] = status;
//     setStatuses(newStatuses);
//     dispatch(updateApplicationStatusAction(id, status));
//     window.location.reload();
//   };
//
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Submitted":
//         return "primary";
//       case "Hired":
//         return "success";
//       case "Interview":
//         return "warning";
//       case "Denied":
//         return "danger";
//       default:
//         return "secondary";
//     }
//   };
//
//   return (
//       <>
//         <Table hover className="text-center">
//           <thead>
//           <tr>
//             <th>Application</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>GTID</th>
//             <th>Year</th>
//             <th>Program</th>
//             <th>Status</th>
//             <th>Change Status</th>
//             <th></th>
//           </tr>
//           </thead>
//           <tbody>
//           {props?.semester === "Spring 2023" &&
//               applications &&
//               applications.map((application, idx) => (
//                   <tr key={application._id}>
//                     <td>
//                       <Button
//                           variant="primary"
//                           onClick={() =>
//                               navigate("/viewapplication", { state: { application } })
//                           }>View</Button>
//                     </td>
//                     <td>{application.student.name}</td>
//                     <td>{application.student.email}</td>
//                     <td>{application.student.gtID}</td>
//                     <td>{application.student.userInfo.year}</td>
//                     <td>{application.student.userInfo.program}</td>
//                     <td>{application.status}</td>
//                     <td>
//                       <Form.Group controlId="updateStatus">
//                         <DropdownButton
//                             key={application._id}
//                             variant={getStatusColor(statuses[idx])}
//                             title={statuses[idx] || "Select Status"}
//                             onSelect={handleStatusChange(application._id, idx)}
//                             default="Submitted">
//                           <Dropdown.Item eventKey="Submitted">Submitted</Dropdown.Item>
//                           <Dropdown.Item eventKey="Hired">Hired</Dropdown.Item>
//                           <Dropdown.Item eventKey="Interview">Interview</Dropdown.Item>
//                           <Dropdown.Item eventKey="Denied">Denied</Dropdown.Item>
//                         </DropdownButton>
//                       </Form.Group>
//                     </td>
//                     <td>
//                       <ProfSchedulerWrapper application={application} />
//                     </td>
//                   </tr>
//               ))}
//           </tbody>
//         </Table>
//       </>
//   );
// };

export default ApplicationTable;