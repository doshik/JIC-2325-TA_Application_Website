import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";

const StudentApplicationTable = () => {
  return (
        <Container>
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th scope="col">Course Name</th>
                        <th scope="col">CRN</th>
                        <th scope="col">Professor Name</th>
                        <th scope="col">Semester</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CS 1332</td>
                        <td>54321</td>
                        <td>Richard Landry</td>
                        <td>Spring 2023</td>
                        <td>
                        <Button>View</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>CS 2050</td>
                        <td>12345</td>
                        <td>Gerandy Brito</td>
                        <td>Spring 2023</td>
                        <td>
                        <Button>View</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>CS 4641</td>
                        <td>98765</td>
                        <td>Mahdi Roozbahani</td>
                        <td>Spring 2023</td>
                        <td>
                        <Button>View</Button>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>CS 3311</td>
                        <td>25299</td>
                        <td>Rodrigo Valente Borela</td>
                        <td>Spring 2023</td>
                        <td>
                        <Button>View</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="secondary">Go Back</Button>{' '}
        </Container>
    );
};

export default StudentApplicationTable;