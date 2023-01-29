import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";

const ApplicationTemplatesTable = () => {
  return (
        <Container className="mt-3">
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
                        <td>
                            <time datetime="2023-01-29">January 29, 2023</time> 
                        </td>
                        <td>No</td>
                        <td>
                            <Button>View</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default ApplicationTemplatesTable;
