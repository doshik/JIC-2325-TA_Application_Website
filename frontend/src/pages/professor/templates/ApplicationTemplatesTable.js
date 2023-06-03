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

  let defaultTemplate;
  if (applicationTemplates && applicationTemplates.length > 0) {
    defaultTemplate = applicationTemplates.find((template) => template.name === "Default");
  }

  const sortedTemplates = applicationTemplates 
    ? defaultTemplate 
      ? [defaultTemplate, ...applicationTemplates.filter((template) => template.name !== "Default")]
      : [...applicationTemplates]
    : [];
  console.log(applicationTemplates)
  console.log(`tmp: ${applicationTemplates && applicationTemplates[0] ? applicationTemplates[0].name : "No templates found"}`)
  console.log(`Application templates: ${JSON.stringify(sortedTemplates)}`)
  return (
    <Container>
      { applicationTemplates && applicationTemplates.length > 0 && applicationTemplates[0].name ?
        <Table hover size="sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(sortedTemplates) && sortedTemplates.map((template) => 
            {
              if (!template) {
                console.error("Undefined template!");
                return null;
              }

              console.log(`Template: ${JSON.stringify(template)}`)
              return (
        
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
              )})}
          </tbody>
        </Table> :
        <div><h1>Application Templates not found</h1></div>
    }
    </Container>
  );
};

export default ApplicationTemplatesTable;
