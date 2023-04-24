import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getApplicationTemplatesAction,
  deleteApplicationTemplateAction,
} from "../../../redux/actions/applicationTemplateActions";

const ApplicationTemplatesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicationTemplates = useSelector(
    (state) => state.application_templates.applicationTemplates
  );
  
  useEffect(() => {
    dispatch(getApplicationTemplatesAction());
  }, [dispatch]);

  const sortedTemplates = applicationTemplates ? [
    applicationTemplates.find((template) => template.name === "Default"),
    ...applicationTemplates.filter((template) => template.name !== "Default")
  ] : [];

  return (
    <Container>
      <Table hover size="sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedTemplates) && sortedTemplates.map((template) => (
              <tr key={template._id}>
                <td scope="row">{template.name}</td>
                <td>
                  {template.name === "Default" ? (
                    <Button
                      variant="primary"
                      onClick={() => navigate("/templates/default", { state: { template } })}
                    >
                      View
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate("/templates/edit", { state: { template } })
                        }
                        className="me-2"
                      >
                        View/Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          dispatch(deleteApplicationTemplateAction(template._id))
                        }
                      >
                        Delete
                      </Button>
                  </>
                )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApplicationTemplatesTable;
