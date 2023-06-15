import * as React from "react";
import Select from 'react-select';
import {
  Button, Form, DropdownButton, Dropdown, FormGroup,
} from "react-bootstrap";

import {
  Table, Header, HeaderRow, Body, Row, HeaderCell, Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";

import ProfSchedulerWrapper from "./ProfSchedulerWrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfApplicationsAction, updateApplicationStatusAction,
} from "../../../redux/actions/applicationActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';

const ApplicationTable = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applications = useSelector((state) => state.application.applications);
  const [statuses, setStatuses] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("");
  const [coursesTakenFilter, setCoursesTakenFilter] = React.useState([]);
  const [coursesTakingFilter, setCoursesTakingFilter] = React.useState([]);
  const [majorFilter, setMajorFilter] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [curPage, setCurPage] = React.useState(1);

  useEffect(() => {
    updateData();
  }, [curPage, sortBy, coursesTakenFilter, coursesTakingFilter, majorFilter]);

  useEffect(() => {
    if (applications?.submissions) {
      setStatuses(applications.submissions.map((application) => application.status));
    }
  }, [applications]);

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

  const updateData = () => {
    let sort_by_gpa = (sortBy === "GPA");
    let sort_by_year = (sortBy === "Year");

    dispatch(getProfApplicationsAction(course._id, pageSize, curPage, 
        sort_by_gpa, sort_by_year, majorFilter, coursesTakenFilter, coursesTakingFilter));
  }

  const data = { nodes: applications?.submissions || [] };
  const pagination = usePagination(data, {
    state: {
      page: 0,
      total: 5,
      size: 5,
    }
  });

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

        <Table  data={data} pagination={pagination}>{
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
                  {course.semester === "Spring 2023" &&
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

        <div>

        <Button
          disabled={pagination.page === 0}
          onClick={() => setCurPage(curPage - 1)}
        >
          <ArrowLeft />
        </Button>

        <span style={{margin:"0px 10px"}}>
          Page {applications?.submissions ? curPage : 0} of {applications?.submissions ? applications.totalPages : 0}
        </span>

        <Button
          disabled={pagination.page + 1 >= Math.ceil(pagination.total / pagination.size)}
          onClick={() => setCurPage(curPage + 1)}
        >
          <ArrowRight />
        </Button>
      </div>
      </>
  );
};

export default ApplicationTable;