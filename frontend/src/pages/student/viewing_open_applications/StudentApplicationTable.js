import * as React from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { getStudentCoursesAction } from "../../../redux/actions/courseActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


const StudentApplicationTable = () => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.course.courses);

    useEffect(() => {
        dispatch(getStudentCoursesAction());
    }, [dispatch]);

    return (
        <Container fluid className="ms-0 me-0">
            {courses.length > 0 ? (
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col">Course ID</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Professor Name</th>
                            <th scope="col">CRN</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => {
                            return (
                                <tr>
                                    <td>{course.courseId}</td>
                                    <td>{course.courseTitle}</td>
                                    <td>{course.professor.name}</td>
                                    <td>{course.CRN}</td>
                                    <td><Button>View</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <Card>
                    <Card.Body>
                        There are currently no open applications.
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default StudentApplicationTable;