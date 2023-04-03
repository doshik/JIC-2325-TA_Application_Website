import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getApplicationTemplatesAction,
  deleteApplicationTemplateAction,
} from "../../redux/actions/applicationActions";

const ApplicationTemplatesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationTemplates = useSelector(
    (state) => state.application.applicationTemplates
  );

  console.log(applicationTemplates);

  useEffect(() => {
    dispatch(getApplicationTemplatesAction());
  }, [dispatch]);

  return (
    <Container>
      <Table hover size="sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last Modified</th>
            <th scope="col">Assigned to Course?</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Default</th>
            <td>N/A</td>
            <td>No</td>
            <td>
              <Button
                variant="primary"
                style={styles.button}
                onClick={() => navigate("templates/default")}
              >
                View
              </Button>
            </td>
          </tr>
          {applicationTemplates &&
            applicationTemplates.map((template) => (
              <tr key={template.id}>
                <th scope="row">{template.name}</th>
                <td> {template.modified} </td>
                <td>{template.assigned}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`${template.url}`)}
                    style={styles.button}
                  >
                    View/Edit
                  </Button>
                  <Button
                    variant="danger"
                    style={styles.button}
                    onClick={() =>
                      dispatch(deleteApplicationTemplateAction(template._id))
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApplicationTemplatesTable;

const styles = {
  button: {
    marginRight: "10px",
  },
};
